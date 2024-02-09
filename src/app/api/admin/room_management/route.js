import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const roomManagement = await prisma.room.findMany({
      select: {
        id: true,
        name: true,
        size: true,
        bedType: true,
        status: true,
        checkInDate: true,
        checkOutDate: true,
        guests: true,
        description: true,
        pricePerNight: true,
        promotionPrice: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: roomManagement,
    });
  } catch (error) {
    console.error("Error fetching customer bookings:", error);
    return NextResponse.error("Error fetching customer bookings");
  }
}
