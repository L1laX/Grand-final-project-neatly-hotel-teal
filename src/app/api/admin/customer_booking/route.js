import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const keywords = searchParams.get("keywords");

  try {
    const customerBookings = await prisma.customerBooking.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            role: true,
            image: true,
            created_at: true,
            updated_at: true,
            emailVerified: true,
            name: true,
            userProfile: true,
          },
        },
        customerBooking_room: {
          include: {
            room: {
              select: {
                name: true,
                size: true,
                bedType: true,
                status: true,
                checkInDate: true,
                checkOutDate: true,
                guests: true,
                description: true,
                roomMainImage: true,
                pricePerNight: true,
                promotionPrice: true,
                created_at: true,
                last_updated_at: true,
                roomAmenity: true,
                roomGallery: true,
              },
            },
          },
        },
        bookingRequest: true,
      },
      where: keywords
        ? {
            OR: [
              {
                customerName: {
                  contains: keywords,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {},
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
