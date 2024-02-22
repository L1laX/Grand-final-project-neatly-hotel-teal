import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params: { booking_id } }) {

    // const customerBooking = await prisma.user.findUnique({
    //   where: {
    //     id: booking_id,
    //   },
    //   include:{userProfile:true}
    // });
    //const {name} = await request.json()


    const searchParams = new URLSearchParams(new URL(request.url).search);
    const roomName = searchParams.get("roomName");
    //console.log(roomName)

    const customerBooking = await prisma.user.findUnique({
      where: {
        id: booking_id,
      },
      select: {
        name:true,
        email: true,
        userProfile: {
          select: {
            country: true,
            id_number: true,
            dateOfBirth: true,
            payment_id:true
          }
        }
      }
    });

    const promotionCode = await prisma.promotion.findMany({
      where: {
        name: roomName
      }
    })
    console.log(promotionCode)
    

    console.log(customerBooking);
    return NextResponse.json({
      message: "Fetching booking_id data complete!",
      data: customerBooking,
      promotionCode:promotionCode,
    },{status:200});

}

// export async function POST(request, { params: { booking_id } }) {
//   try {
//     const customerBooking = await prisma.customerBooking.create({
//       data: {
//         ...request.body,
//       },
//     });
//     console.log(customerBooking);
//     return NextResponse.json({
//       message: "Creating booking_id data complete!",
//       data: customerBooking,
//       status: 200,
//     });
//   } catch (error) {
//     return NextResponse.json({ message: "error" }, { status: 400 });
//   }
// }
