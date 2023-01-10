import verifyJwt from "../../../middlewares/verifyJwt";
import prisma from "../../../lib/prisma";


const profile = async (req, res) => {
    const user = req.auth.user
    const messageCount = await prisma.message.count({
        where: {
            read: false,
            user_id: user.id
        }
    })
    res.status(200).json({username: user.username, unReadMessages: messageCount})

}

export default verifyJwt(profile)