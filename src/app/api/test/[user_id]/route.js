import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server";

//endpoit: /api/test/[id] ex /api/test/1 endpoint params
export async function GET(request, { params: { user_id } }) {
  try {
    // const isBookingOrder = prisma.customerBooking.findUnique({
    //   where: {
    //     id: booking_id,
    //   },
    //   include: {
    //     user: true,
    //   },
    // });

    // if (!isBookingOrder) {
    //   return NextResponse.json({
    //     status: 404,
    //     message: "There's no booking order!",
    //   });
    // }

    // const bookingHistory = await prisma.customerBooking.findUnique({
    //   where: {
    //     user_id: user_id,
    //   },
    //   include: {
    //     user: true,
    //     customerBooking_room: true,
    //     bookingRequest: true,
    //   },
    // });
    const bookingHistory = await prisma.customerBooking.findMany({
      where: {
        user_id: user_id,
      },
    });

    console.log(bookingHistory);

    if (!bookingHistory)
      return NextResponse.json({
        status: 404,
        message: "Customer Booking not found",
      });

    return NextResponse.json({
      testName: user_id,
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