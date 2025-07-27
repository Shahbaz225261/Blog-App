import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions, SessionStrategy } from "next-auth";
import client from "../../../lib/db"; 

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "signin",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        const username = credentials?.username;
        const password = credentials?.password;
        if (!username || !password) return null;

        const user = await client.user.findFirst({ where: { username } });
        if (!user) return null;

        return {
          id: user.id.toString(),
          username: user.username,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
