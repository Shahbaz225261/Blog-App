import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "../../../lib/db";

const handler = NextAuth({
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
        return user;
      },
    }),
  ],
  pages:{
    signOut:"/"
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
