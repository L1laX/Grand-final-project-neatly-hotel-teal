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
        console.log(username);
        if (!email && !username) {
          return null;
        }
        if (username) {
          console.log("matching password");
          const passwordMatch = await compare(
            credentials.password,
            username.password,
          );
          console.log("check", username);
          console.log(passwordMatch);
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
          console.log("SendingData!", data);
          return data;
        }
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
          console.log("SendingData!", data);
          return data;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
