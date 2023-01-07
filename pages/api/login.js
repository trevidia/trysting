import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";
import {createTokens} from "../../lib/auth";
import CorsMiddleware from "../../middlewares/corsMiddleware";

export default async function handler(req, res) {
    try {
        const {username, password} = req.body
        if (!(username && password)) return res.status(400).json({message: "Invalid Input"})
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })
        if (!user) return res.status(400).json({message: "Invalid Username"})
        console.log(req.headers.authorization)
        const result = await bcrypt.compare(password, user.password)
        if (!result) return res.status(400).json({message: "Invalid Password"})
        const jwtUser = {
            id: user.id,
            email: user.email,
            username: user.username
        }

        // function createTokens creates the tokens and stores them in the database
        const {refreshToken, accessToken} = await createTokens({user: jwtUser}, user.id)

        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; Max-Age=${24 * 60 * 60}; HttpOnly`)
        res.status(200).json({ user: jwtUser, accessToken})
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}