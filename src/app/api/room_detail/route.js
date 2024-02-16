import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { format, addDays } from "date-fns";

export async function GET(req, res) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);

    const checkin = new Date(searchParams.get("checkin"));
    const checkout = new Date(searchParams.get("checkout"));
    const room = searchParams.get("room");
    const guest = searchParams.get("guest");

    checkin.setUTCHours(0, 0, 0, 0);
    checkout.setUTCHours(23, 59, 59, 999);

    const bookedRooms = await prisma.customerBooking.findMany({
      where: {
        checkInDate: {
          lte: checkout,
        },
        checkOutDate: {
          gte: checkin,
        },
      },
      include: {
        room: true,
      },
    });

    const bookedRoomIds = new Set(
      bookedRooms.map((booking) => booking.room.id),
    );

    const allRooms = await prisma.room.findMany();

    const availableRoomIds = allRooms
      .filter((room) => !bookedRoomIds.has(room.id))
      .map((room) => room.id);

    const data = await prisma.room.findMany({
      where: {
        id: {
          in: availableRoomIds,
        },
      },
      include: {
        customerBooking: {
          where: {
            OR: [
              {
                checkInDate: {
                  gte: addDays(checkout, 1),
                },
              },
              {
                checkOutDate: {
                  gte: addDays(checkout, 1),
                },
              },
            ],
          },
        },
      },
    });

    const response = {
      status: "success",
      message: "Available rooms retrieved successfully",
      data,
    };

    console.log("Checkin:", checkin);
    console.log("Checkout:", checkout);
    console.log("Room:", room);
    console.log("Guest:", guest);
    console.log("All Rooms:", allRooms);
    console.log("Booked Rooms:", bookedRooms);
    console.log("Available Rooms:", data);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error:", error);

    const errorResponse = {
      status: "error",
      message: "An error occurred while processing the request",
      error: error.message,
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
