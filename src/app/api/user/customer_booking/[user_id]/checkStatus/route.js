import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request, { params: { user_id } }) {
  try {
    const checkStatus = await prisma.room.findMany({
      where: {
        userBooking_id: user_id,
      },
      select: {
        id: true,
      },
    });

    const data = checkStatus.map((item) => item.id);
    const checkTimeout = await prisma.room.findMany({
      where: {
        last_updated_at: {
          lte: new Date(Date.now() - 15 * 60 * 1000),
        },
        userBooking_id: user_id,
      },
    });
    const checkTimeoutData = checkTimeout.map((item) => item.id);
    return NextResponse.json(
      {
        message: "GET checking user data success",
        data: data,
        checkTimeOut: checkTimeoutData,
      },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "error", error: e }, { status: 500 });
  }
}
