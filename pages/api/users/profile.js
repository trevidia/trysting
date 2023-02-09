import prisma from "../../../lib/prisma";
import {getSession} from "next-auth/react";


const profile = async (req, res) => {
    const session = await getSession({req})
    if (!session) return res.status(401).json({message: "not authenticated"})
    let user = session.user
     user = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    })
    const messageCount = await prisma.message.count({
        where: {
            read: false,
            user_id: user.id
        }
    })
    res.status(200).json({username: user.username, unReadMessages: messageCount})

}

export default profile