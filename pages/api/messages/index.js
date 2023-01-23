import prisma from "../../../lib/prisma";
import {getSession} from "next-auth/react";

const createMessage = async (req, res) => {
    try {
        const {user_id, content} = req.body
        if (!(user_id && content)) return res.status(400).json({message: "Invalid Input"})
        const message = await prisma.message.create({
            data: {
                user_id: parseInt(user_id),
                content
            }
        })
        res.status(201).json({message: "Message sent successfully"})
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

export default createMessage