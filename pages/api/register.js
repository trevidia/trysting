import bcrypt from 'bcrypt';
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
    try {
        const {email, password, username} = req.body
        if (!(email && password && username)) return res.status(400).json({message: "Invalid Inputs"})
        const hash = await bcrypt.hash(password, 10)
        const oldUsers = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        username
                    },
                    {
                        email,
                    }
                ]
            },
            select: {
                id: true,
                email: true,
                username: true,
            }

        })

        if (oldUsers.length >= 1) return res.status(409).json({message: "User Already exist change username or email"})

        const user = await prisma.user.create({
            data: {
                username, email, password: hash
            },
            select: {
                id: true,
                email: true,
                username: true
            }
        })

        res.status(201).json({ user})
    } catch (err){
        res.status(500).json({message: err.message})
    }
}