import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export function GET(request) {
  return NextResponse.json({ message: "Hello world" });
}

export async function PUT(request) {
  const room_id = "4412afd0-c38a-448b-9145-fad0cbda05a8";
  const result = await prisma.room.update({
    where: {
      id: room_id,
    },
    data: {
      status: "Booking",
    },
  });

  // const checkBookingStatus = await prisma.room.updateMany({
  //   where: {
  //     status: "Booking",
  //     last_updated_at: {
  //       lte: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  //     },
  //   },
  //   data: { status: "Vacant" },
  // });

  return NextResponse.json({ message: "PUT Methode success" }, { status: 200 });
}
