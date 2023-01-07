import bcrypt from 'bcrypt';
import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken"
import {createTokens} from "../../lib/auth";
import CorsMiddleware from "../../middlewares/corsMiddleware";

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
        console.log(oldUsers)

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
        console.log(user, process.env.REFRESH_TOKEN_SECRET)

        // function creates the tokens and stores them in the database
        const {refreshToken, accessToken } = await createTokens({user: user}, user.id)

        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; Max-Age=${24 * 60 * 60}; HttpOnly`)

        res.status(201).json({ user, accessToken})
    } catch (err){
        res.status(500).json({message: err.message})
    }
}