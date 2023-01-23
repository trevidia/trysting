import prisma from "../../../lib/prisma";
import verifyJwt from "../../../middlewares/verifyJwt";
import {getSession} from "next-auth/react";

const Messages = async (req, res)=>{
    const session = await getSession({req})
    if (!session) return res.status(401).json({message: "not authenticated"})
    const user = session.user
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

// export default verifyJwt(Messages)
export default Messages
