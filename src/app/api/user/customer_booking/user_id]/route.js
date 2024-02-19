import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params: { user_id } }) {
  // console.log(booking_id);
  try {
    const userBookingProfile = await prisma.userProfile.findMany({
      where: {
        user_id: user_id,
      },
    });
    console.log(userBookingProfile);

    if (!userBookingProfile) {
      return NextResponse.json({ error: "User Account not found" });
    }

    return NextResponse.json({
      message: "Fetching user profile complete!",
      data: userBookingProfile,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user profile!" },
      { status: 400 },
    );
  }
}

export async function POST(request, { params: { booking_id } }) {
  try {
    const customerBooking = await prisma.customerBooking.create({
      data: {
        ...request.body,
      },
    });
    console.log(customerBooking);
    return NextResponse.json({
      message: "Creating booking_id data complete!",
      data: customerBooking,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
}
