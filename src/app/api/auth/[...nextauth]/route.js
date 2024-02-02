import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";

const handler = NextAuth({
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "Enter your username or email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        //validating data
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        const username = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });
        const email = await prisma.user.findUnique({
          where: {
            email: credentials.username,
          },
        });
        if (!email && !username) {
          return null;
        }
        //if login with username
        if (username) {
          const passwordMatch = await compare(
            credentials.password,
            username.password,
          );
          if (!passwordMatch) {
            return null;
          }
          const data = {
            id: username.id,
            username: username.username,
            email: username.email,
            role: username.role,
            image: username.image,
          };
          return data;
        }
        //if login with email
        if (email) {
          const passwordMatch = await compare(
            credentials.password,
            email.password,
          );
          if (!passwordMatch) {
            return null;
          }
          const data = {
            id: email.id,
            username: email.username,
            email: email.email,
            role: email.role,
            image: email.image,
          };
          return data;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.image = token.image;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
