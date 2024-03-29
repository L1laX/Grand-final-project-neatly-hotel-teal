import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(req) {
  const body = await req.json();
  const {
    email,
    username,
    password,
    fullName,
    id_number,
    dateOfBirth,
    country,
    role,
    image,
  } = body;
  const validEmailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.match(validEmailRegex)) {
    return NextResponse.json(
      { user: null, messaga: "Email fomat is not valid" },
      { status: 409 },
    );
  }
  try {
    // getting username and email to check if they already exist
    const checkEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    const checkUsername = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    //checking if email or username already exists
    if (checkEmail) {
      return NextResponse.json(
        { user: null, messaga: "Email already exists" },
        { status: 409 },
      );
    }
    if (checkUsername) {
      return NextResponse.json(
        { user: null, messaga: "Username already exists" },
        { status: 409 },
      );
    }
    if (!fullName || !id_number || !dateOfBirth || !country) {
      return NextResponse.json(
        { user: null, messaga: "Please fill Information required fields" },
        { status: 400 },
      );
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
      const newUser = await prisma.user.create({
        data: {
          email: email,
          username: username,
          role: role,
          password: hashedPassword,
          image: image,
          name: fullName,
          userProfile: {
            create: {
              id_number: id_number,
              dateOfBirth: new Date(dateOfBirth),
              country: country,
            },
          },
        },
      });
      // send without password
      const { password: userpassword, ...rest } = newUser;

      return NextResponse.json(
        {
          user: rest,
          messaga: "Success",
        },
        { status: 201 },
      );
    } catch (e) {
      console.error(e);
    }
  } catch (error) {
    return NextResponse.json({
      messaga: "Error " + error.message,
    });
  }
}
