import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import client from "../../../lib/db"; 

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "signin",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        const username = credentials?.username;
        const password = credentials?.password;
        if (!username || !password) return null;

        const user = await client.user.findFirst({ where: { username } });
        if (!user) return null;
        return {
          id: user.id,
          username: user.username,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user }:any) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },

    async session({ session, token }:any) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    },


    async signIn({ account, profile }:any) {
      if (account?.provider === "google") {
        if (!profile?.email) throw new Error("No email in Google profile");

        await client.user.upsert({
          where: { username: profile.email },
          create: { username: profile.email },
          update: { username: profile.email },
        });
      }
      return true;
    },
  },

  pages: {
    signOut: "/",
  },

  secret: process.env.NEXTAUTH_SECRET!,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
