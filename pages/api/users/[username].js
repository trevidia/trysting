import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
    try {
        console.log(req.method)
        switch (req.method) {
            case "GET":
                const username = req.query.username
                const user = await prisma.user.findUnique({
                    where: {
                        username
                    }
                })
                let available = false
                if (user){
                    available = true
                }
                return res.json({available, username, userId: user?.id})
            default:
                return res.status(405).json({message: "Method not allowed"})
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}