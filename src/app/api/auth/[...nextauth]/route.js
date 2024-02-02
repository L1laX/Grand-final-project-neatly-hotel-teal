import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
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
        //   const res = await fetch("https://www.melivecode.com/api/login", {
        //     method: "POST",
        //     body: JSON.stringify(credentials),
        //     headers: { "Content-Type": "application/json" },
        //   });
        //   const data = await res.json();
        //   console.log(data);
        //   if (data.status === "ok") {
        //     return data.user;
        //   }
        //   return null;
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
        if (!username && email) {
          const passwordMatch = await compare(
            credentials.password,
            email.password,
          );
          if (!passwordMatch) {
            return null;
          }
          return {
            id: email.id,
            username: email.username,
            email: email.email,
          };
        } else {
          const passwordMatch = await compare(
            credentials.password,
            user.password,
          );
          if (!passwordMatch) {
            return null;
          }
          return {
            id: username.id,
            username: username.username,
            email: username.email,
          };
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
