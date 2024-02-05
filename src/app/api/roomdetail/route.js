import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, res) {

  const url = new URL(req.url); // Uncomment this line
  const searchParams = new URLSearchParams(url.search);

  const checkin = new Date(searchParams.get("checkin"));
  const checkout = new Date(searchParams.get("checkout"));

  const data = await prisma.room.findMany({
    orderBy: [{ id: "asc" }],
    where: {
      OR: [
        { status: "Vacant" },
        {
          AND: [
            { checkInDate: { not: { gte: checkin } } },
            { checkInDate: { not: { lte: checkout } } },
            { checkOutDate: { not: { gte: checkin } } },
            { checkOutDate: { not: { lte: checkout } } },
          ],
        },
      ],
      NOT: [{ checkInDate: null }, { checkOutDate: null }],
    },
  });

  // const token = searchParams.get('token')
  // console.log(searchParams)
  // console.log(req)
//   console.log(checkin);
//   console.log(checkout);
  // console.log(data);
  return NextResponse.json(data);
}
