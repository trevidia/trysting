import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    try {
        switch (req.method) {
            case "POST":
                let id = parseInt(req.query.user)
                let {password} = req.body

                if (isNaN(id) || !password) return res.status(400).json({message: "Invalid Input"})
                password = await bcrypt.hash(password, 10)
                await prisma.user.update({
                    where: {
                        id
                    },
                    data: {
                        password
                    }
                })


               return res.json({message: "success"})
            default:
                return res.status(405).json({message: "Method not allowed"})
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}