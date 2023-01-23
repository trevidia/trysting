import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";

export const authOptions = {
    strategy: 'jwt',
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials, req){
                const {username, password} = req.body
                const user = await prisma.user.findUnique({
                    where: {
                        username
                    }
                })
                if (!user) throw new Error("Invalid Username")

                const result = await bcrypt.compare(password, user.password)
                if (!result) throw new Error("Invalid Password")

                console.log(username, password)
                return user

            },
            pages: {
                signIn: "login"
            }
        })
    ],
    callbacks: {
        async session({session, token, user}) {
            session.user.id = token.id
            session.user.username = token.username
            return session
        },
        async jwt({token, user, account, profile}){
            if (user){
                token.id = user.id
                token.username = user.username
            }
            return token
        }
    },
}

export default NextAuth(authOptions)