import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function GET(request) {
  const allRooms = await prisma.room.findMany();

  const allBookingRooms = await prisma.customerBooking.findMany({
    include: {
      customerBooking_room: {
        include: {
          room: true,
        },
      },
    },
  });

  return NextResponse.json(allBookingRooms, { status: 200 });
}

// export async function PUT(request) {
//   const room_id = "83d83e16-c63a-49df-a546-e56a06416238";
//   const result = await prisma.room.update({
//     where: {
//       id: room_id,
//     },
//     data: {
//       status: "Booking",
//     },
//   });

//   // const checkBookingStatus = await prisma.room.updateMany({
//   //   where: {
//   //     status: "Booking",
//   //     last_updated_at: {
//   //       lte: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
//   //     },
//   //   },
//   //   data: { status: "Vacant" },
//   // });

//   return NextResponse.json({ message: "PUT Methode success" }, { status: 200 });
// }
