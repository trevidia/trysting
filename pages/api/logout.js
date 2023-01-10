import prisma from "../../lib/prisma";

const Logout = async (req, res) =>{
    const cookies = req.cookies;
    if (!cookies.refreshToken) return res.status(204).send()
    const refreshToken = cookies.refreshToken
    console.log(refreshToken)

    const foundUser = await prisma.user.findFirst({
        where: {
            token: refreshToken
        },
    })
    console.log(foundUser)
    if (!foundUser){
        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; Max-Age=${24 * 60 * 60}; HttpOnly`)
        return res.status(204).send()
    }
    const user = await prisma.user.update({
        where: {
            id: foundUser.id,
        },
        data: {
            token: null
        }
    })
    console.log(user)
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; Max-Age=-1; HttpOnly`)
    res.status(204).send()

}

export default Logout