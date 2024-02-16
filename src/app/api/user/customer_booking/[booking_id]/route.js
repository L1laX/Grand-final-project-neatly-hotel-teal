import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params: { booking_id } }) {
  try {
    const customerBooking = await prisma.customerBooking.findMany({
      where: {
        id: +booking_id,
      },
    });
    console.log(customerBooking);
    return NextResponse.json({
      message: "Fetching booking_id data complete!",
      data: customerBooking,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
}

export async function POST(request, { params: { booking_id } }) {
  try {
    const customerBooking = await prisma.customerBooking.create({
      data: {
        ...request.body,
      },
    });
    console.log(customerBooking);
    return NextResponse.json({
      message: "Creating booking_id data complete!",
      data: customerBooking,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
}
