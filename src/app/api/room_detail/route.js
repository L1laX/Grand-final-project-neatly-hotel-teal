import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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

  // checkin.setUTCHours(23, 59, 59, 999); // คือนับถึงวินาทีสุดท้ายของวัน

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
  //   include: {
  //     room: true,
  //   },
  // });

  // const availableRoom = await prisma.customerBooking.findMany({
  //   orderBy: [{ id: "asc" }],
  //   where: {
  //     OR: [
  //       {
  //         AND: [
  //           { checkInDate: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
  //           { checkInDate: { gt: new Date(new Date(checkin).setHours(23, 59, 59, 999)) } },
  //           { checkInDate: { gte: new Date(new Date(checkout).setHours(0, 0, 0, 0)) } }
  //         ]
  //       },
  //       {
  //         AND: [
  //           { checkOutDate: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
  //           { checkOutDate: { lte: new Date(new Date(checkin).setHours(23, 59, 59, 999)) } },
  //           { checkOutDate: { lt: new Date(new Date(checkout).setHours(0, 0, 0, 0)) } }
  //         ]
  //       },
  //     ],
  //     NOT: [{ checkInDate: null }, { checkOutDate: null }],
  //   },
  //   include: {
  //     room: true,
  //   },
  // });

  // const allRooms = await prisma.customerBooking.findMany({
  //   include: {
  //     room: true,
  //   },
  // });

  // allRooms.forEach((item)=>{
  //   item.checkInDate.setUTCHours(0, 0, 0, 0);
  //   item.checkOutDate.setUTCHours(23, 59, 59, 999);
  // })

  // const bookedRoomList = allRooms.filter((item)=>{
  //   return item.checkInDate>new Date().setUTCHours(0, 0, 0, 0) && item.checkInDate <= checkin && item.checkOutDate >= checkout
  // })

  // const uniqueRoom = allRooms.filter((available, index) => {
  //   return index === allRooms.findIndex((duplicate) => available.room_id === duplicate.room_id);
  // });

  // const availableRoom =  uniqueRoom.filter(room => !bookedRoomList.some(bookedRoom => bookedRoom.room_id === room.room_id));//from chat gpt

  //   //max room & max guest โดยการคำนวนห้องที่ว่าง
  // const maxCapacity = availableRoom.reduce((acc, cur) => {
  //   if (!acc[cur.room.name]) {
  //     acc[cur.room.name] = { ...cur, availableRoom: 0, availableGuest: 0, room_id_list:[] };
  //   }
  //   acc[cur.room.name].availableRoom+=1;
  //   acc[cur.room.name].availableGuest+=cur.room.guests;
  //   acc[cur.room.name].room_id_list=[...acc[cur.room.name].room_id_list,{room_id:cur.room.id}];
  //   return acc;
  // }, {});

  //   const arrMaxCapacity = Object.values(maxCapacity);

  // //ห้องที่จะจองต้องน้อยกว่าหรือเท่ากับห้องที่ว่าง คนเข้าพักต้องน้อยกว่า หรือเท่ากับจำนวนห้อง*availableGuest
  // const data = arrMaxCapacity.filter((item)=>room<=item.availableRoom&&guest<=room*item.room.guests)
  // //const data = arrMaxCapacity.filter((item)=>room<=item.availableRoom&&guest<=room*(item.availableGuest/item.availableRoom))

  const checkBookingStatus = await prisma.room.updateMany({
    where: {
      last_updated_at: {
        lte: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      },
    },
    data: { userBooking_id: null },
  });

  const allRooms = await prisma.room.findMany({
    where: {
      userBooking_id: null,
    },
  });

  const allBookingRooms = await prisma.customerBooking.findMany({
    include: {
      customerBooking_room: true,
    },
  });

  allBookingRooms.forEach((item) => {
    item.checkInDate.setHours(0, 0, 0, 0);
    item.checkOutDate.setHours(0, 0, 0, 0);
  });
  //20-23 1.ห้องที่ทับกันพอดี เอาออก 2.ห้องที่เเหลื่อมมากกว่าและน้อยกว่า(19-22||21-25) เอาออก 3.วันที่คร้่อมกัน(19-25||17-26) เก็บห้องที่จะไม่เอาออก
  const bookedRoomList =
    allBookingRooms.filter((item) => {
      return (
        //อยู่ในช่วงเดียวกัน 21-22 ออก
        (item.checkInDate > new Date().setUTCHours(0, 0, 0, 0) &&
          item.checkInDate <= checkin &&
          checkin < item.checkOutDate &&
          item.checkOutDate >= checkout &&
          checkout > item.checkInDate) ||
        // วันที่คร่อมกัน 19-25 ออก
        (item.checkInDate > new Date().setUTCHours(0, 0, 0, 0) &&
          checkin <= item.checkInDate &&
          checkout >= item.checkOutDate) ||
        // เอา 19-22 ออก
        (item.checkInDate > new Date().setUTCHours(0, 0, 0, 0) &&
          checkin < item.checkInDate &&
          checkout <= item.checkOutDate &&
          checkout > item.checkInDate) ||
        //เอา 21-25 ออก
        (item.checkInDate > new Date().setUTCHours(0, 0, 0, 0) &&
          checkout > item.checkOutDate &&
          checkin >= item.checkInDate &&
          checkin < item.checkOutDate)

        // ||item.checkInDate > new Date().setUTCHours(0, 0, 0, 0) &&
        // checkin === checkout &&
        // checkin >= item.checkInDate && checkin < item.checkOutDate
      );
    }) || [];
  console.log(bookedRoomList, "bookedRoomList");
  // const uniqueRoom = allBookingRooms.filter((available, index) => {
  //   return index === allBookingRooms.findIndex((duplicate) => available.room_id === duplicate.room_id);
  // });

  //fillter out booked rooms
  // const availableRoom =  allRooms.filter((room )=> !bookedRoomList.some((bookedRoom) => bookedRoom.room_id === room.id));//from chat gpt

  const availableRoom = allRooms.reduce((acc, cur) => {
    if (!bookedRoomList.length) {
      acc.push(cur);
    }
    bookedRoomList.map((bookedRoom) => {
      bookedRoom.customerBooking_room.map((room) => {
        if (room.room_id !== cur.id) {
          console.log(room.room_id, cur.id, "room.room_id !== cur.id");
          acc.push(cur);
        }
      });
    });
    return acc;
  }, []);
  console.log(availableRoom, "availableRoom");
  //max room & max guest โดยการคำนวนห้องที่ว่าง
  const maxCapacity = availableRoom.reduce((acc, cur) => {
    if (!acc[cur.name]) {
      acc[cur.name] = {
        ...cur,
        availableRoom: 0,
        availableGuest: 0,
        room_id_list: [],
      };
    }
    acc[cur.name].availableRoom += 1;
    acc[cur.name].availableGuest += cur.guests;
    acc[cur.name].room_id_list = [...acc[cur.name].room_id_list, cur.id];
    // acc[cur.name].room_id_list=[...acc[cur.name].room_id_list,{room_id:cur.id}];// แบบเก็บเป็น arrobj
    return acc;
  }, {});

  const arrMaxCapacity = Object.values(maxCapacity);

  //ห้องที่จะจองต้องน้อยกว่าหรือเท่ากับห้องที่ว่าง
  const data = arrMaxCapacity.filter(
    (item) => room <= item.availableRoom && guest <= room * item.guests,
  );

  // //เช่นroom id 1 อาจจะออกหลายรอบเลยต้องการให้เหลือแค่อันเดียว
  // const uniqueRoom = availableRoom.filter((available, index) => {
  //   return index === availableRoom.findIndex((duplicate) => available.room_id === duplicate.room_id);
  // });

  // //max room & max guest โดยการคำนวนห้องที่ว่าง
  // const maxCapacity = uniqueRoom.reduce((acc, cur) => {
  //   if (!acc[cur.room.name]) {
  //     acc[cur.room.name] = { ...cur, availableRoom: 0, availableGuest: 0, room_id_list:[] }; //...cur คือ attribute ที่มาจาก customerBooking
  //   }
  //   acc[cur.room.name].availableRoom+=1;
  //   acc[cur.room.name].availableGuest+=cur.room.guests;
  //   acc[cur.room.name].room_id_list=[...acc[cur.room.name].room_id_list,{room_id:cur.room.id}];
  //   return acc;
  // }, {});

  // const arrMaxCapacity = Object.values(maxCapacity);

  // //ห้องที่จะจองต้องน้อยกว่าหรือเท่ากับห้องที่ว่าง คนเข้าพักต้องน้อยกว่า หรือเท่ากับจำนวนห้อง*availableGuest
  // const data = arrMaxCapacity.filter((item)=>room<=item.availableRoom&&guest<=room*item.room.guests)
  // //const data = arrMaxCapacity.filter((item)=>room<=item.availableRoom&&guest<=room*(item.availableGuest/item.availableRoom))

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
  // console.log(allRooms[1].checkInDate);
  // console.log(allRooms[1].checkOutDate);
  // console.log(allRooms[1].checkInDate<checkin);

  // console.log("room:", room);
  // console.log("guest:", guest);
  // console.log(bookedRoomList)
  // console.log(roomData);
  // console.log(arrMaxCaacity);
  // console.log(arrMaxCapacity);
  // console.log(availableRoomName);
  // console.log(availableRoom);
  // console.log(allRooms)
  // console.log(uniqueRoom);
  // console.log(maxCapacity);
  // console.log(data);
  // console.log(new Date(Date.now()).toISOString());
  // console.log(new Date(Date.now() - 15 * 60 * 1000).toISOString());
  // console.log(new Date(Date.now() - 15 * 60 * 1000));
  return NextResponse.json(data);
}
