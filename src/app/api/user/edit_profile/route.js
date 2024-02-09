import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req, res) {
  try {
    const userProfileId = await prisma.userProfile.findUnique({
      where: { user_id: 1 },
    });

    if (!userProfileId) {
      return NextResponse.status(404).json({ error: "User Account not found" });
    }

    console.log({ data: userProfileId });
    return NextResponse.status(500).json({ data: userProfileId });
  } catch (error) {
    return NextResponse.status(500).json({ error: "Failed to update data" });
  }
}

// export async function PUT(req, res) {
//   const { userId } = req.query;
//   const { fullName, id_number, dateOfBirth, country } = req.body;

//   try {
//     const updatedProfileData = await prisma.userProfile.update({
//       where: { user_id: userId },
//       data: { fullName, id_number, dateOfBirth, country },
//     });
//     console.log({ data: updatedProfileData });
//     return NextResponse.status(500).json({ data: updatedProfileData });
//   } catch (error) {
//     return NextResponse.status(500).json({ error: "Failed to update data" });
//   }
// }
