import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
    try {
        switch (req.method) {
            case "POST":
                let id = parseInt(req.query.user)
                let {username} = req.body

                if (isNaN(id) || !username) return res.status(400).json({message: "Invalid Input"})
                const oldUser = await prisma.user.findUnique({
                    where: {
                        username
                    }
                })
                if (oldUser?.id === id) {
                    return res.status(409).json({message: "Please select a new username"})
                } else if (oldUser){
                    return res.status(409).json({message: "Username belongs to another user"})
                }
                await prisma.user.update({
                    where: {
                        id
                    },
                    data: {
                        username
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