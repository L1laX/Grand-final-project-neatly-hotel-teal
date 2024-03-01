import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server";

export async function GET(request, { params: { customer_booking_id } }) {
  try {
    const customerBooking = await prisma.customerBooking.findUnique({
      where: {
        id: customer_booking_id,
      },
      include: {
        user: true,
        customerBooking_room: {
          include: {
            room: true,
          },
        },
        bookingRequest: true,
      },
    });

    if (!customerBooking) {
      return NextResponse.error("Customer booking not found", { status: 404 });
    }
    console.log(customerBooking);
    const rooms = customerBooking.customerBooking_room.map((bookingRoom) => ({
      name: bookingRoom.room.name,
      size: bookingRoom.room.size,
      bedType: bookingRoom.room.bedType,
      status: bookingRoom.room.status,
      checkInDate: bookingRoom.room.checkInDate,
      checkOutDate: bookingRoom.room.checkOutDate,
      guests: bookingRoom.room.guests,
      description: bookingRoom.room.description,
      roomMainImage: bookingRoom.room.roomMainImage,
      pricePerNight: bookingRoom.room.pricePerNight,
      promotionPrice: bookingRoom.room.promotionPrice,
      created_at: bookingRoom.room.created_at,
      last_updated_at: bookingRoom.room.last_updated_at,
      roomAmenity: bookingRoom.room.roomAmenity,
      roomGallery: bookingRoom.room.roomGallery,
      totalPrice: bookingRoom.totalPrice,
    }));

    return NextResponse.json({
      success: true,
      data: { ...customerBooking, rooms },
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching customer booking:", error);
    return NextResponse.error("Error fetching customer booking");
  }
}
