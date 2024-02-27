import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params: { room_id } }) {
  const result = await prisma.room.findUnique({
    //เอาที่ไหน  where  จาก ฟังชั่น Get  ด้วย  PARAMITER  คือ room_id
    where: {
      id: room_id,
    },
    include: {
      // เอาอีกส่วน
      roomAmenity: true,
      roomGallery: true,
      // ใส่ true  เพราะ จะเอามาด้วย = จะใช้
    },
  });

  const thisRoomName = result.name

  let allMainImage = await prisma.room.findMany({
    select: { id: true, name:true, roomMainImage: true },
  });


  allMainImage = Object.values(allMainImage.reduce((acc, obj) => {
    acc[obj.name] = acc[obj.name] || obj;

    return acc;
  }, {}));

  allMainImage = allMainImage.filter((item)=>item.name !== thisRoomName)

  const otherRoomImages = allMainImage.reduce((acc,cur,index,arr)=>{
    if(acc.length<=1){
      let randomNumber = Math.floor(Math.random() * arr.length)
      acc.push(arr[randomNumber])
      arr.splice(randomNumber,1)
    }
    return acc
  },[])

  console.log("testttttss",otherRoomImages)

  //console.log(result);

  return NextResponse.json(
    { message: "Success", data: result, otherRoomImages },
    { status: 200 },
  );
}