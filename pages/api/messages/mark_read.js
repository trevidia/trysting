import verifyJwt from "../../../middlewares/verifyJwt";
import prisma from "../../../lib/prisma";
import {getSession} from "next-auth/react";

const Handler = async (req, res) => {
    try {
        const session = await getSession({req})
        if (!session) return res.status(401).json({message: "Not Authenticated"})

        const ids = req.body.ids
        const user = session.user
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

export default Handler

