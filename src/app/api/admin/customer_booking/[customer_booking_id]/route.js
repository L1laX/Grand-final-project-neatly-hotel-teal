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
            room: {
              include: {
                roomAmenity: true,
              },
            },
          },
        },
        bookingRequest: true,
      },
    });

    if (!customerBooking) {
      return NextResponse.error("Customer booking not found", { status: 404 });
    }

    // Manually fetch promotions if there's a logical way to relate them to the booking or rooms
    // For demonstration, let's assume we fetch all promotions and filter them in the application code
    const promotions = await prisma.promotion.findMany();
    // You would need to filter or match these promotions based on your logic

    const rooms = customerBooking.customerBooking_room.map((bookingRoom) => {
      // Find related promotions based on your logic, for example, by room name
      const relatedPromotion = promotions.find(
        (p) => p.name === bookingRoom.room.name,
      );

      return {
        ...bookingRoom.room,

        promotion: relatedPromotion
          ? {
              promotionCode: relatedPromotion.promotionCode,
              discount: relatedPromotion.discount,
              name: relatedPromotion.name,
            }
          : null,
        // Since room amenities are directly fetched, they should already be included in the bookingRoom.room object
      };
    });

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
