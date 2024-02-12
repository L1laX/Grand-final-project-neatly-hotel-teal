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
