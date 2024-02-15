import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params: { user_id } }) {
  try {
    const customerBooking = await prisma.customerBooking.findMany({
      where: {
        user_id: +user_id,
      },
    });

    return NextResponse.json(customerBooking);
  } catch (error) {}
}
