import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// export async function GET(request, { params: { booking_id } }) {
//   const searchParams = new URLSearchParams(new URL(request.url).search);
//   const roomName = searchParams.get("roomName");

//   const customerBooking = await prisma.user.findUnique({
//     where: { id: booking_id },
//     select: {
//       name: true,
//       email: true,
//       userProfile: {
//         select: {
//           country: true,
//           id_number: true,
//           dateOfBirth: true,
//           payment_id: true,
//         },
//       },
//     },
//   });

//   const promotionCode = await prisma.promotion.findMany({
//     where: { name: roomName },
//   });

//   return NextResponse.json(
//     {
//       message: "Fetching booking_id data complete!",
//       data: customerBooking,
//       promotionCode: promotionCode,
//     },
//     { status: 200 },
//   );
// }

export async function POST(request, response) {
  // const  bookingBody = await request.json();

  // const { user_id,...rest} = bookingBody

  // console.log(rest);

  const {
    customerName,
    customerEmail,
    customer_id_number,
    customerCountry,
    customerDateOfBirth,
    paymentType,
    paymentStatus,
    user_id,

    checkInDate,
    checkOutDate,
  } = await request.json();

  // await prisma.customerBooking.create({
  //   data: {
  //     ...birdy,
  //     user: {
  //       create: {
  //         email: "newUser@example.com",
  //       },
  //     },
  //   },
  // });

  // await prisma.customerBooking.create({
  //   data: {
  //     ...birdy,
  //     user: {
  //       connect: {
  //         id: "bac21942-58bc-4f7d-b555-3eb09ac8b281",
  //       },
  //     },
  //   },
  // });

  // await prisma.customerBooking.create({
  //   data: {
  //     customerName: customerName,
  //     customerEmail: customerEmail,
  //     customer_id_number: customer_id_number,
  //     customerCountry: customerCountry,
  //     customerDateOfBirth: customerDateOfBirth,
  //     paymentType: paymentType,
  //     paymentStatus: paymentStatus,
  //     order_id: order_id,
  //     promotionCode: promotionCode,
  //     guestCount: guestCount,
  //     discount: discount,
  //     checkInDate:checkInDate,
  //     checkOutDate:checkOutDate,
  //     additionalRequest: additionalRequest,
  //     bookingRequest: {
  //       create: bookingRequest.map((request) => {
  //         return { name: request };
  //       }),
  //     },
  //     customerBooking_room: {
  //       create: room_id.map((id) => {
  //         return { room: { connect: { id: id } } };
  //       }),
  //     },
  //     user: {
  //       connect: {
  //         id: user_id,
  //       },
  //     },
  //   },
  // });

  return NextResponse.json({
    message: "success",
  });
}
