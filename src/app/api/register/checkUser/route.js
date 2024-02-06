import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function POST(request) {
  const data = await request.json();
  const { email, username } = data;
  const isUserDuplicate = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  const isEmailDuplicate = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (isUserDuplicate) {
    return NextResponse.json({ message: "Username already exists" });
  }
  if (isEmailDuplicate) {
    return NextResponse.json({ message: "Email already exists" });
  }

  return NextResponse.json({ message: "success" });
}
