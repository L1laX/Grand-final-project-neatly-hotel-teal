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
  const data = await request.json();
  const { fullName, id_number, dateOfBirth, country, email, image } = data;
  console.log(data);
  try {
    const isDataExist = await prisma.userProfile.findUnique({
      where: { user_id: +user_id },
      data: {
        id_number: id_number,
      },
      include: { user: { email: email } },
    });

    if (data === isDataExist) {
      return NextResponse.json({ error: "Already Exist" });
    }
    const updateProfileData = await prisma.userProfile.update({
      where: { user_id: +user_id },
      data: {
        fullName,
        id_number,
        dateOfBirth,
        country,
      },
    });
    console.log(updateProfileData);
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