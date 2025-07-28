import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "../../../lib/db";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { User } from "next-auth";
import { signIn } from "next-auth/react";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "signin",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any):Promise<any> {
        const username = credentials?.username;
        const password = credentials?.password;
        if (!username || !password) return null;

        const user = await client.user.findFirst({ where: { username } });
        if (!user) return null;
        return {
          id:user.id,
          username:user.username
        };
      },
    }),
  ],
  
  callbacks: {
    //@ts-ignore
    async jwt({ token, user }) {
      if(user){
        token.username = user.username;
        token.id       = user.id;
      }
      return token;
    },
    //@ts-ignore
    async session({ session, token }){
      if(token){
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    }
  },
  pages:{
    signOut:"/",
    signIn:"/signin"
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };
