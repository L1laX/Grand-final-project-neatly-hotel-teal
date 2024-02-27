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

      include: {
        user: true,
        customerBooking_room: { include: { room: true } },
      },
    });

    console.log(bookingHistory);

    if (!bookingHistory.length)
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

export async function PUT(request, { params: { user_id } }) {
  try {
    const changeDate = await prisma.customerBooking.update({
      where: {
        user_id: user_id,
      },
      data: {
        checkInDate: "2022-10-20",
        checkOutDate: "2022-10-21",
      },
    });

    console.log(changeDate);

    return NextResponse.json({
      data: changeDate,
      message: "Change Date Success!",
      status: 200,
    });
  } catch (error) {
    console.log("Error changing Date:", error);
    return NextResponse.json({
      status: 500,
      message: "Error changing Date",
    });
  }
}

export async function DELETE(request, { params: { user_id } }) {
  console.log("Heeloooo");
  const searchParams = new URLSearchParams(new URL(request.url).search);
  const booking_id = searchParams.get("bookingId");
  console.log(booking_id);

  try {
    const delBookingOrder = await prisma.customerBooking.delete({
      where: {
        id: booking_id,
      },
    });

    console.log(delBookingOrder);

    return NextResponse.json({
      data: delBookingOrder,
      message: "Delete Booking Order Success!",
      status: 200,
    });
  } catch (error) {
    console.log("Error deleting Booking Order:", error);
    return NextResponse.json({
      status: 500,
      message: "Error deleting Booking Order",
    });
  }
}
