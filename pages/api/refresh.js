import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";
import CorsMiddleware from "../../middlewares/corsMiddleware";

const refresh = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        console.log(refreshToken, 'refresh')
        if (!refreshToken) return res.status(401).json({message: "Not authenticated"})

        const user = await prisma.user.findFirst({
            where:{
                token: refreshToken
            },
            select: {
                id: true,
                email: true,
                username: true
            }

        })
        console.log(user)
        if(!user) return res.status(403).json({message: "Not authenticated"})

        await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded)=>{
            if (err || user.username !== decoded.user.username) return res.status(403).json({message: err.message})
            const accessToken = jwt.sign({user: user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "2h"})
            res.json({accessToken, user})
        })

    } catch (e) {
        res.status(500).json({message: e.message})
    }
}


export default refresh