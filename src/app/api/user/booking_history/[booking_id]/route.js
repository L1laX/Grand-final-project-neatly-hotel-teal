import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server";

export async function GET(request, { params: { booking_id } }) {
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

    const roomType = await prisma.room.findMany({
      where: {
        name: isBookingOrder.customerBooking_room[0].room.name,
      },
      include: {
        customerBooking_room: { include: { customerBooking: true } },
      },
    });

    let bookedRoom = roomType.reduce((acc, room) => {
      let bookings = room.customerBooking_room.map(
        (booking) => booking.customerBooking,
      );
      return [...acc, ...bookings];
    }, []);

    bookedRoom = bookedRoom.map((room) => {
      return {
        checkInDate: room.checkInDate,
        checkOutDate: room.checkOutDate,
      };
    });

    //เอาเฉพาะปัจจุบันไปจนถึงอนาคต
    bookedRoom = bookedRoom.filter(
      (room) => Date.parse(room.checkInDate) >= Date.now(),
    );

    console.log(bookedRoom);

    if (!isBookingOrder) {
      return NextResponse.json({
        status: 404,
        message: "There's no booking order!",
      });
    }

    return NextResponse.json({
      data: isBookingOrder,
      status: 200,
      bookedRoom: bookedRoom,
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
//เมื่อกด cancle จะไม่ลบข้อมูลออกจาก database แต่จะเปลี่ยน status ของ paymentStatus ให้เป็น canceled
export async function PUT(request, { params: { booking_id } }) {
  console.log(booking_id);
  try {
    const cancleBookingOrder = await prisma.customerBooking.update({
      where: {
        id: booking_id,
      },
      data: {
        paymentStatus: "canceled",
      },
    });

    return NextResponse.json({
      data: cancleBookingOrder,
      status: 200,
      message: "Booking Order has been cancled",
    });
  } catch (error) {
    console.log("Error cancel Booking Order:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
// ให้อัพเดทเวลาจอง
export async function POST(request, { params: { booking_id } }) {
  const { checkInDate, checkOutDate } = await request.json();

  console.log("ggggg", checkInDate, checkOutDate);
  try {
    const changeBookingDate = await prisma.customerBooking.update({
      where: {
        id: booking_id,
      },
      data: {
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
      },
    });

    return NextResponse.json({
      data: changeBookingDate,
      status: 200,
      message: "Booking Date has been changed",
    });
  } catch (error) {
    console.log("Error Change Booking Date:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

export async function DELETE(request, { params: { booking_id } }) {
  console.log(booking_id);
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
