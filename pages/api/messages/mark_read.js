import verifyJwt from "../../../middlewares/verifyJwt";
import prisma from "../../../lib/prisma";

const Handler = async (req, res) => {
    try {
        const ids = req.body.ids
        const user = req.auth.user
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                messages: {
                    updateMany: {
                        where: { id: {in: ids}},
                        data: {read: true}
                    }
                }
            }
        })
        res.json({message: "success"})
    } catch (e) {
        res.status(500).json({message: e.message})
    }

}

export default verifyJwt(Handler)

