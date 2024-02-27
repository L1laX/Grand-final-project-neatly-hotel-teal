import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params: { user_id } }) {
  // const customerBooking = await prisma.user.findUnique({
  //   where: {
  //     id: user_id,
  //   },
  //   include:{userProfile:true}
  // });
  //const {name} = await request.json()
    const searchParams = new URLSearchParams(new URL(request.url).search);
    const roomName = searchParams.get("roomName");
    const allRoomId = searchParams.get("allRoomId").split(',');

    // await prisma.room.updateMany({
    //   where: {
    //     status: "Vacant",
    //     id: {
    //       in: allRoomId
    //     }
    //   },
    //   data: { status: "Booking" },
    // });
    console.log(user_id)
    const customerBooking = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
      include:{
        userProfile:true
      }
    },
  );

 

    const promotionCode = await prisma.promotion.findMany({
      where: {
        name: roomName
      }
    })
  
    console.log(customerBooking);
    return NextResponse.json({

      message: "Fetching user_id data complete!",
      data: customerBooking,
      promotionCode: promotionCode,
    },
    { status: 200 },
  );
}

// export async function POST(request, { params: { booking_id } }) {
//   try {
//     // Extract relevant data from request body or values state
//     const {
//       dateOfBirth,
//       email,
//       id_number,
//       country,
//       payment_id,
//       order_id,
//       roomName,
//       checkinDate,
//       checkOutDate,
//       guestCount,
//       allRoomId,
//       roomPrice,
//       user_id,
//       totalPrice,
//     } = request.body;

//     // Create customer booking in the database
//     const customerBooking = await prisma.customerBooking.create({
//       data: {
//         dateOfBirth,
//         email,
//         id_number,
//         country,
//         payment_id,
//         order_id,
//         roomName,
//         checkinDate,
//         checkOutDate,
//         guestCount,
//         allRoomId,
//         roomPrice,
//         user_id,
//         totalPrice,
//         // Add other fields as needed
//       },
//     });

//     console.log(customerBooking);

//     return NextResponse.json({
//       message: "Creating booking_id data complete!",
//       data: customerBooking,
//       status: 200,
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Error creating booking data" },
//       { status: 500 },
//     );
//   }
// }

