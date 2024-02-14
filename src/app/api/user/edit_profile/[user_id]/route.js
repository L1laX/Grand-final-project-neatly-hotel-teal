import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params: { user_id } }) {
  try {
    const userProfileData = await prisma.userProfile.findUnique({
      where: { user_id: +user_id },
      include: { user: true },
    });

    if (!userProfileData) {
      return NextResponse.json({ error: "User Account not found" });
    }

    console.log({ data: userProfileData });
    return NextResponse.json(
      {
        success: true,
        data: userProfileData,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error fetching user profile...");
    return NextResponse.json(
      {
        error: "Error fetching user profile",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params: { user_id } }) {
  try {
    const { fullName, idNumber, dateOfBirth, country, email, image } =
      await request.json();
    const userData = { fullName, idNumber, dateOfBirth, country, email, image };

    if (!userData) {
      return NextResponse.json(
        { error: "Missing require fields" },
        { status: 400 },
      );
    }

    const isEmailExist = await prisma.user.findUnique({
      where: { email: email },
    });
    console.log(isEmailExist);

    if (isEmailExist && isEmailExist.id !== +user_id) {
      return NextResponse.json(
        { error: "Email already exist" },
        { status: 404 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: +user_id },
      data: {
        email: email,
        image: image,
        userProfile: {
          update: {
            where: { user_id: +user_id },
            data: {
              fullName,
              idNumber,
              dateOfBirth,
              country,
            },
          },
        },
      },
      include: { userProfile: true },
    });

    return NextResponse.json(
      {
        message: "Update user success",
        data: updatedUser,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Update user profile failed...");
    return NextResponse.json(
      {
        error: "Update user profile failed",
      },
      { status: 500 },
    );
  }
}
