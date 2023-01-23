import verifyJwt from "../../../middlewares/verifyJwt";
import prisma from "../../../lib/prisma";
import {getSession} from "next-auth/react";


const profile = async (req, res) => {
    const session = await getSession({req})
    console.log(session, "profile")
    if (!session) return res.status(401).json({message: "not authenticated"})
    const user = session.user
    const messageCount = await prisma.message.count({
        where: {
            read: false,
            user_id: user.id
        }
    })
    res.status(200).json({username: user.username, unReadMessages: messageCount})

}

export default profile