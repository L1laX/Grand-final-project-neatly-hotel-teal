// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET(request, { params: { user_id } }) {
//   console.log(user_id, "Hey");
//   try {
//     console.log(2);
//     const userProfileData = await prisma.userProfile.findUnique({
//       where: { user_id: +user_id },
//     });
//     console.log(3);
//     if (!userProfileData) {
//       return NextResponse.json({ error: "User Account not found" });
//     }

//     console.log({ data: userProfileData });
//     return NextResponse.json({
//       success: true,
//       data: userProfileData,
//     });
//   } catch (error) {
//     console.log("Error fetching user profile...");
//     return NextResponse.json({
//       error: "Error fetching user profile",
//     });
//   }
// }

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
