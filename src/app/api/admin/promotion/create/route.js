import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  const { promotionCode, discount, name } = await request.json();

  try {
    const isRoomNameExists = await prisma.room.findMany({
      where: {
        name: name + "",
      },
    });

    if (!isRoomNameExists.length) {
      return NextResponse.json(
        { message: "Room name not found" },
        {
          status: 400,
        },
      );
    }

    const newPromotion = await prisma.promotion.create({
      data: {
        promotionCode,
        discount,
        name,
      },
    });

    return NextResponse.json(
      {
        message: "Promotion added!",
      },
      { status: 201 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "error", error: e }, { status: 500 });
  }
}
