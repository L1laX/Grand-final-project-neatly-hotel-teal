import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server";

export async function GET(request, { params: { user_id } }) {
  console.log(user_id);

  try {
    const customerBookings = await prisma.customerBooking.findUnique({
      where: { user_id: user_id },
    });

    if (!customerBookings) {
      return NextResponse.error("Customer booking not found", { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: customerBookings,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching customer bookings:", error);
    return NextResponse.error("Error fetching customer bookings");
  }
}
