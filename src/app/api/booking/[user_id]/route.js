import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(request, { params: { user_id } }) {
  const searchParams = new URLSearchParams(new URL(request.url).search);
  let rooms_id = searchParams.get("rooms_id");
  let roomName = searchParams.get("name");
  if (rooms_id.includes(",")) {
    rooms_id = rooms_id.split(",");
  }
  let query;
  typeof rooms_id === "string"
    ? (query = { where: { id: rooms_id }, data: { status: "Booking" } })
    : (query = {
        where: {
          OR: [
            rooms_id.map((item) => {
              return { id: item };
            }),
          ],
        },
        data: { status: "Booking" },
      });
  const bookingStatus = await prisma.room.updateMany(query);
  const promotionCode = await prisma.promotion.findMany({
    where: {
      name: roomName,
    },
  });

  const customerBooking = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
    include: { userProfile: true },
  });
  return NextResponse.json({
    message: "Fetching user_id data complete!",
    data: { customerBooking, promotionCode },
    status: 200,
  });
}
