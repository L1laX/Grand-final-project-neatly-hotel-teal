import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server";

// findMany แสดงรายการจองห้องพักทั้งหมดของ userนี้
export async function GET(request) {
  const searchParams = new URLSearchParams(new URL(request.url).search);
  const user_id = searchParams.get("userId");

  try {
    const bookingHistory = await prisma.customerBooking.findMany({
      where: {
        user_id: user_id,
      },
      orderBy: {
        created_at: "desc",
      },

      include: {
        user: true,
        customerBooking_room: { include: { room: true } },
        bookingRequest: true,
      },
    });

    console.log(bookingHistory);

    if (!bookingHistory.length)
      return NextResponse.json({
        status: 404,
        message: "Customer Booking not found",
      });

    return NextResponse.json({
      data: bookingHistory,
      message: "Fetching Booking History Success!",
      status: 200,
    });
  } catch (error) {
    console.log("Error fetching Customer Bookings:", error);
    return NextResponse.json({
      status: 500,
      message: "Error fetching Customer Bookings",
    });
  }
}
