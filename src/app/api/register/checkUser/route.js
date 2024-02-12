import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function POST(request) {
  const data = await request.json();
  const { email, username, id_number } = data;
  try {
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
    const isId_NumberDuplicate = await prisma.userProfile.findUnique({
      where: {
        id_number: id_number,
      },
    });
    if (isId_NumberDuplicate) {
      return NextResponse.json({ message: "Id Number already exists" });
    }
    if (isUserDuplicate) {
      return NextResponse.json({ message: "Username already exists" });
    }
    if (isEmailDuplicate) {
      return NextResponse.json({ message: "Email already exists" });
    }
    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
}
