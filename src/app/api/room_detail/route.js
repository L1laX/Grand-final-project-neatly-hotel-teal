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
  const room = searchParams.get("room");
  const guest = searchParams.get("guest");
  //checkin.setUTCHours(23, 59, 59, 999); // คือนับถึงวินาทีสุดท้ายของวัน

  const availableRoom = await prisma.customerBooking.findMany({
    orderBy: [{ id: "asc" }],
    where: {
      OR: [
        {
          // status: "Vacant",
          checkInDate: { gte:new Date(new Date().setHours(0, 0, 0, 0)), gt: new Date(new Date(checkin).setHours(23, 59, 59, 999)), gte: new Date(new Date(checkout).setHours(0, 0, 0, 0)) },
        },
        {
          // status: "Vacant",
          checkOutDate: {  gte:new Date(new Date().setHours(0, 0, 0, 0)), lte: new Date(new Date(checkin).setHours(23, 59, 59, 999)), lt: new Date(new Date(checkout).setHours(0, 0, 0, 0)) },
        },
      ],
      NOT: [{ checkInDate: null }, { checkOutDate: null }],
    },
    include: {
      room: true,
    },
  });

  //เช่นroom id 1 อาจจะออกหลายรอบเลยต้องการให้เหลือแค่อันเดียว
  const uniqueRoom = availableRoom.filter((available, index) => {
    return index === availableRoom.findIndex((duplicate) => available.room_id === duplicate.room_id);
  });

  //max room & max guest โดยการคำนวนห้องที่ว่าง
  const maxCapacity = uniqueRoom.reduce((acc, cur) => {
    if (!acc[cur.room.name]) {
      acc[cur.room.name] = { ...cur, availableRoom: 0, availableGuest: 0, room_id_list:[] }; //...cur คือ attribute ที่มาจาก customerBooking
    }
    acc[cur.room.name].availableRoom+=1;
    acc[cur.room.name].availableGuest+=cur.room.guests;
    acc[cur.room.name].room_id_list=[...acc[cur.room.name].room_id_list,{room_id:cur.room.id}];
    return acc;
  }, {});

  const arrMaxCapacity = Object.values(maxCapacity);

  //ห้องที่จะจองต้องน้อยกว่าหรือเท่ากับห้องที่ว่าง คนเข้าพักต้องน้อยกว่า หรือเท่ากับจำนวนห้อง*availableGuest
  const data = arrMaxCapacity.filter((item)=>room<=item.availableRoom&&guest<=item.availableRoom*item.availableGuest)


  //อีกวิธี
  // const roomData = await prisma.room.findMany()

  // const availableRoom = await prisma.customerBooking.findMany({
  //   orderBy: [{ id: "asc" }],
  //   where: {
  //     OR: [
  //       {
  //         // status: "Vacant",
  //         checkInDate: { gte:new Date(new Date().setHours(0, 0, 0, 0)), gt: new Date(new Date(checkin).setHours(23, 59, 59, 999)), gte: new Date(new Date(checkout).setHours(0, 0, 0, 0)) },
  //       },
  //       {
  //         // status: "Vacant",
  //         checkOutDate: {  gte:new Date(new Date().setHours(0, 0, 0, 0)), lte: new Date(new Date(checkin).setHours(23, 59, 59, 999)), lt: new Date(new Date(checkout).setHours(0, 0, 0, 0)) },
  //       },
  //     ],
  //     NOT: [{ checkInDate: null }, { checkOutDate: null }],
  //   },
  // });

  // //เช่นroom id 1 อาจจะออกหลายรอบเลยต้องการให้เหลือแค่อันเดียว
  // const uniqueRoom = availableRoom.filter((available, index) => {
  //   return index === availableRoom.findIndex((duplicate) => available.room_id === duplicate.room_id);
  // });

  // //เพิ่มชื่อห้องและ maxGuests ในแต่ละห้อง
  // const availableRoomName = uniqueRoom.map((item) => ({
  //   ...item, // attribute ที่มาจาก customerBooking
  //   name: roomData.find((room) => room.id === item.room_id)?.name || "Unknown",
  //   maxGuests: roomData.find((room) => room.id === item.room_id)?.guests || "Unknown",
  //   //อยากได้ attribute ไหนของ entity roomData สามารถเพิ่มตรงนี้ได้ แต่ {...roomData} ไม่ได้ ต้องเจาะเข้าไปอีกชั้นเช่น {...roomData[0]} หรือเช่นด้านบน find หา value ใน arr เลย
  // }));
  // //max room & max guest โดยการคำนวนห้องที่ว่าง
  // const maxCapacity = availableRoomName.reduce((acc, cur) => {
  //   if (!acc[cur.name]) {
  //     acc[cur.name] = { ...cur, room: 0, guest: 0, room_id_list:[] }; //...cur คือ attribute ที่มาจาก customerBooking
  //   }
  //   acc[cur.name].room+=1;
  //   acc[cur.name].guest+=cur.maxGuests;
  //   acc[cur.name].room_id_list=[...acc[cur.name].room_id_list,{room_id:cur.room_id}];
  //   return acc;
  // }, {});

  // const arrMaxCaacity = Object.values(maxCapacity);

  // //ห้องที่จะจองต้องน้อยกว่าหรือเท่ากับห้องที่เหลือ คนเข้าพักต้องน้อยกว่า หรือเท่ากับจำนวนห้อง*maxGuests
  // const data = arrMaxCaacity.filter((item)=>room<=item.room&&guest<=item.room*item.maxGuests)




  // const data = maxCapacity.filter((item)=>{
  //   if(item.room<=room&&item.guest<=room)
  // })
  

  // const maxCapacity = uniqueRoom.reduce((acc,cur)=>{
  //   if (!acc[cur.room_id]) {
  //     acc[cur.room_id] = { room_id: cur.room_id, room: 0, guest: 0 };
  //   }
  //   acc[cur.room_id].room+=1;
  //   acc[cur.room_id].guest+=roomData[roomData.findIndex((room)=>cur.room_id===room.id)].guests;
  //   return acc;
  // },{})

  // const maxCapacity = roomData.reduce((acc, cur) => {
  //   if (!acc[cur.name]) {
  //     acc[cur.name] = { room: 0, guest: 0 };
  //   }
  //   return acc;
  // }, {});

  // const token = searchParams.get('token')
  // console.log(searchParams)
  // console.log(req)
  // console.log(checkin);
  // console.log(checkout);
  console.log("room:",room);
  console.log("guest:",guest);
  // console.log(roomData);
  // console.log(arrMaxCaacity);
  // console.log(arrMaxCapacity);
  // console.log(availableRoomName);
  // console.log(uniqueRoom);
  // console.log(maxCapacity);
  console.log(data);
  return NextResponse.json(data);
}
