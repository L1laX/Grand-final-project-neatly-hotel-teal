import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server";

export async function GET(request, { params: { customer_booking_id } }) {
  console.log(customer_booking_id);
  const customerId = customer_booking_id;

  try {
    const customerBookings = await prisma.customerBooking.findUnique({
      where: {
        id: customerId,
      },
      include: {
        room: true,
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
