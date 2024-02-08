import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { format } from "date-fns";

export async function GET(req, res) {

  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);

  //แบบเปลี่ยน format
  // const checkin = format(new Date(searchParams.get("checkin")), 'yyyy-MM-dd');
  // const checkout = format(new Date(searchParams.get("checkout")), 'yyyy-MM-dd');

  //เงื่อนไข สมมุติห้องนี้ติดจองวันที่ checkin-15/checkout-17
  //checkin < 15 && checkout <= 15 เช่น search checkin-14/checkout-15 จะสามารถจองห้องนี้ได้
  //checkin >= 17 && checkout > 17 เช่น search checkin-17/checkout-18 จะสามารถจองห้องนี้ได้
  const checkin = new Date(searchParams.get("checkin"));
  const checkout = new Date(searchParams.get("checkout"));
  checkin.setUTCHours(23, 59, 59, 999); // คือนับถึงวินาทีสุดท้ายของวัน


  // const data = await prisma.room.findMany({
  //   orderBy: [{ id: "asc" }],
  //   where: {
  //     OR: [
  //       {
  //         // status: "Vacant",
  //         checkInDate: { gt: new Date(checkin), gte: new Date(checkout) },
  //       },
  //       {
  //         // status: "Vacant",
  //         checkOutDate: { lte: new Date(checkin), lt: new Date(checkout) },
  //       },
  //     ],
  //     NOT: [{ checkInDate: null }, { checkOutDate: null }],
  //   },
  // });

  // const data = await prisma.customerBooking.findMany({
  //   orderBy: [{ id: "asc" }],
  //   where: {
  //     OR: [
  //       {
  //         // status: "Vacant",
  //         checkInDate: { gt: new Date(checkin), gte: new Date(checkout) },
  //       },
  //       {
  //         // status: "Vacant",
  //         checkOutDate: { lte: new Date(checkin), lt: new Date(checkout) },
  //       },
  //     ],
  //     NOT: [{ checkInDate: null }, { checkOutDate: null }],
  //   },
  // });

    const data = await prisma.customerBooking.findMany();

//   const data = await prisma.$queryRaw`
//   SELECT * FROM room
//   WHERE (
//     (status = 'Vacant' AND DATE(checkInDate) > DATE(${checkin}) AND DATE(checkInDate) <= DATE(${checkout}))
//     OR
//     (status = 'Vacant' AND DATE(checkOutDate) >= DATE(${checkin}) AND DATE(checkOutDate) < DATE(${checkout}))
//   )
//   AND checkInDate IS NOT NULL AND checkOutDate IS NOT NULL
//   ORDER BY id ASC
// `;
  

  // const token = searchParams.get('token')
  // console.log(searchParams)
  // console.log(req)
  console.log(checkin);
  console.log(checkout);
  // console.log(data);
  return NextResponse.json(data);
}
