import jwt from "jsonwebtoken";
import prisma from "./prisma";

export const isAuthenticated = (req) => {
  console.log(req.headers.authorization, "is auth")
  // console.log(req.Authorization)
}

export const createTokens = async (data, id) => {
  const refreshToken = await jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'})
  const accessToken = await jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '2h'})

  await prisma.user.update({
    where: {
      id: id
    },
    data: {
      token: refreshToken
    }
  })
  return {refreshToken, accessToken}
}