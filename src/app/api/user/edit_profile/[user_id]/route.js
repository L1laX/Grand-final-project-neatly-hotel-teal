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
    // checking Email and ID number shouldn't be the same
    const isIdNumberExist = await prisma.userProfile.findUnique({
      where: { user_id: +user_id },
      data: {
        id_number: newIdNum,
      },
    });
    console.log(isIdNumberExist);
    const isEmailExist = await prisma.user.findUnique({
      where: { user_id: +user_id },
      include: { user: { email: newEmail } },
    });

    if (isIdNumberExist) {
      return NextResponse.json(
        { message: "This id number already exist" },
        { status: 409 },
      );
    }

    if (isEmailExist) {
      return NextResponse.json(
        { message: "This email already exist" },
        { status: 409 },
      );
    }

    const updateProfileData = await prisma.user.update({
      where: { id: +user_id },
      data: {
        update: { email: "", image: "" },
      },
    });
    if (!updateProfileData) {
      return NextResponse.json({ error: "User Account not found" });
    }

    return NextResponse.json({
      success: true,
      data: updateProfileData,
    });
  } catch (error) {
    console.log("Update user profile failed...");
    return NextResponse.json({
      error: "Update user profile failed",
    });
  }
}

