import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params: { room_id } }) {
  const result = await prisma.room.findUnique({
    //เอาที่ไหน  where  จาก ฟังชั่น Get  ด้วย  PARAMITER  คือ room_id
    where: {
      // id: +room_id,
      //can use (num)
      id:Number(room_id)
    },
    include: {
      // เอาอีกส่วน
      roomAmenity: true,
      roomGallery: true,
      // ใส่ true  เพราะ จะเอามาด้วย = จะใช้
    },
  });
  console.log(result);

  return NextResponse.json(
    { message: "Success", data: result },
    { status: 200 },
  );
}