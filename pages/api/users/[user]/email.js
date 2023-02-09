import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
    try {
        switch (req.method) {
            case "POST":
                let id = parseInt(req.query.user)
                let {email} = req.body

                if (isNaN(id) || !email) return res.status(400).json({message: "Invalid Input"})
                const oldUser = await prisma.user.findUnique({
                    where: {
                        email
                    }
                })
                if (oldUser?.id === id) {
                    return res.status(409).json({message: "Please select a new email"})
                } else if (oldUser){
                    return res.status(409).json({message: "Email belongs to another user"})
                }

                await prisma.user.update({
                    where: {
                        id
                    },
                    data: {
                        email
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