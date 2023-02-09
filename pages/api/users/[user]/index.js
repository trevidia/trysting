import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
    try {
        switch (req.method) {
            case "GET":
                const username = req.query.user

                // gets user from the database

                const user = await prisma.user.findUnique({
                    where: {
                        username
                    }
                })
                let available = false
                // condition to check if a user is available
                // then sends it as response
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