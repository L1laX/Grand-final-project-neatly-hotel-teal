import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params: { booking_id } }) {
  try {
    const customerBooking = await prisma.customerBooking.findMany({
      where: {
        id: +booking_id,
      },
    });

    return NextResponse.json({
      message: "fetching complete",
      data: customerBooking,
    });
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
}
