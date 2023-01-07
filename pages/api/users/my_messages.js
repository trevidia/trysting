import prisma from "../../../lib/prisma";
import verifyJwt from "../../../middlewares/verifyJwt";

const Messages = async (req, res)=>{
    const user = req.auth.user
    const messages = await prisma.message.findMany({
        where:{
            user_id: user.id,
            AND: {
                NOT: {
                    deleted: true
                }
            }
        },

    })
    res.status(200).json({messages: messages})
}

export default verifyJwt(Messages)
