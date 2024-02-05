import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.room.findMany({
    orderBy: [{ id: "asc" }],
    where: {
      OR: [{ status: "Vacant" }],
      NOT: [{ checkInDate: null }, { checkOutDate: null }],
    },
  });
  console.log(data);
  return NextResponse.json(data);
}
