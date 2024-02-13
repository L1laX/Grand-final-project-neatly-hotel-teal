import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const keywords = searchParams.get("keywords");
  try {
    if (!keywords) {
      const roomManagement = await prisma.room.findMany({
        select: {
          id: true,
          name: true,
          size: true,
          bedType: true,
          status: true,
          checkInDate: true,
          checkOutDate: true,
          guests: true,
          description: true,
          pricePerNight: true,
          promotionPrice: true,
        },
      });

      return NextResponse.json({
        success: true,
        data: roomManagement,
      });
    } else {
      const roomManagement = await prisma.room.findMany({
        where: {
          name: {
            contains: keywords,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          name: true,
          size: true,
          bedType: true,
          status: true,
          checkInDate: true,
          checkOutDate: true,
          guests: true,
          description: true,
          pricePerNight: true,
          promotionPrice: true,
        },
      });

      return NextResponse.json({
        success: true,
        data: roomManagement,
      });
    }
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.error("Error fetching rooms");
  }
}

export async function PUT(request) {
  console.log("PUT request received:", request);
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.error("id and status are required", {
        status: 400,
      });
    }

    const updatedRoom = await prisma.room.update({
      where: { id: +id },
      data: {
        status: status,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedRoom,
    });
  } catch (error) {
    console.error("Error updating room status:", error);
    return NextResponse.error(`Error updating room status: ${error.message}`, {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
