import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import GitHubProvider from "next-auth/providers/github";


const prisma = new PrismaClient()

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        })],

    session: {
        strategy: "jwt" as const,
    },
    callbacks: {
        //@ts-ignore
        session({ session, token }) {
            if(token && session.user) {
                session.user.id = token.sub!;
            }
            return session
        }
     }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }