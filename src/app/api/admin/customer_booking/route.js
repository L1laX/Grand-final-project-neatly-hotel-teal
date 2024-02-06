import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const customerBookings = await prisma.customerBooking.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            created_at: true,
            updated_at: true,
          },
        },
        room: {
          select: {
            name: true,
            bedType: true,
          },
        },
        bookingRequest: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: customerBookings,
    });
  } catch (error) {
    console.error("Error fetching customer bookings:", error);
    return NextResponse.error("Error fetching customer bookings");
  }
}
