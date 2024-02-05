import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { format } from "date-fns";

export async function GET(req, res) {

  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);

  //แบบเปลี่ยน format
  // const checkin = format(new Date(searchParams.get("checkin")), 'yyyy-MM-dd');
  // const checkout = format(new Date(searchParams.get("checkout")), 'yyyy-MM-dd');

  const checkin = new Date(searchParams.get("checkin"));
  const checkout = new Date(searchParams.get("checkout"));
  checkout.setUTCHours(23, 59, 59, 999); // คือนับถึงวินาทีสุดท้ายของวัน


  const data = await prisma.room.findMany({
    orderBy: [{ id: "asc" }],
    where: {
      OR: [{ status: "Vacant" }],
      NOT: [{ checkInDate: null }, { checkOutDate: null }],
      // checkInDate: {
      //   gte: new Date(checkin),
      //   lte: new Date(checkout),
      // },
    },
  });

  // const token = searchParams.get('token')
  // console.log(searchParams)
  // console.log(req)
  console.log(checkin);
  console.log(checkout);
  // console.log(data);
  return NextResponse.json(data);
}
