import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server";

export async function GET(request, { params: { booking_id } }) {
  // const searchParams = new URLSearchParams(new URL(request.url).search);
  // const user_id = searchParams.get("userId");
  // console.log(user_id);
  try {
    const isBookingOrder = await prisma.customerBooking.findUnique({
      where: {
        id: booking_id,
      },
      include: {
        user: true,
        customerBooking_room: { include: { room: true } },
        bookingRequest: true,
      },
    });

    if (!isBookingOrder) {
      return NextResponse.json({
        status: 404,
        message: "There's no booking order!",
      });
    }

    return NextResponse.json({
      data: isBookingOrder,
      status: 200,
      message: "Booking Order has been fetched",
    });
  } catch (error) {
    console.log("Error fetching Booking Order:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

// export async function PUT(request, { params: { booking_id } }) {
//   const { bookingId } = request.query;
//   console.log(bookingId);
//   try {
//     const isBookingOrder = await prisma.customerBooking.findUnique({
//       where: {
//         id: bookingId,
//       },
//       include: {
//         user: true,
//       },
//     });

//     if (!isBookingOrder) {
//       return NextResponse.json({
//         status: 404,
//         message: "There's no booking order!",
//       });
//     }

//     return NextResponse.json({
//       status: 200,
//       message: "Booking Order has been deleted",
//     });
//   } catch (error) {
//     console.log("Error deleting Booking Order:", error);
//     return NextResponse.json({
//       status: 500,
//       message: "Internal Server Error",
//     });
//   }
// }

export async function DELETE(request, { params: { booking_id } }) {
  try {
    const deleteBookingOrder = await prisma.customerBooking.delete({
      where: {
        id: booking_id,
      },
    });

    return NextResponse.json({
      data: deleteBookingOrder,
      status: 200,
      message: "Booking Order has been deleted",
    });
  } catch (error) {
    console.log("Error deleting Booking Order:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
