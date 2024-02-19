import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export function GET(request) {
  return NextResponse.json({ message: "Hello world" });
}

export async function PUT(request) {
  const room_id = "83d83e16-c63a-49df-a546-e56a06416238";
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
