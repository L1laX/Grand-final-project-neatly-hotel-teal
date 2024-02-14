import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const keywords = searchParams.get("keywords");
  if (!keywords) {
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
  } else {
    try {
      const customerBookings = await prisma.customerBooking.findMany({
        where: {
          customerName: {
            startsWith: keywords,
            mode: "insensitive",
          },
        },
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
}
