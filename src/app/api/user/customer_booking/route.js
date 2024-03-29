import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();
  const allRoom = data.allRoomId.includes(",")
    ? data.allRoomId.split(",")
    : [data.allRoomId];
  const requestName = [...Object.keys(data.request)];
  const requestValue = [...Object.values(data.request)];

  try {
    const [booking, updateUserPayment_id, updateRoomStatus] =
      await prisma.$transaction([
        prisma.customerBooking.create({
          data: {
            customerName: data.name,
            customerEmail: data.email,
            customer_id_number: data.id_number,
            customerCountry: data.country,
            customerDateOfBirth: new Date(data.dateOfBirth),
            paymentType: data.paymentType + "",
            paymentStatus: data.paymentStatus,
            discount: data?.discount,
            guestCount: +data.guestCount,
            totalPrice: +data.totalPrice,
            additionalRequest: data.additionalRequest,
            checkInDate: new Date(data.checkInDate),
            checkOutDate: new Date(data.checkOutDate),
            promotionCode: data?.promotionCode,
            order_id: data.order_id,
            user: {
              connect: {
                id: data.user_id,
              },
            },
            bookingRequest: {
              create: requestName.map((request, index) => {
                return {
                  name: requestName[index],
                  price: +requestValue[index] ? +requestValue[index] : 0,
                };
              }),
            },
            customerBooking_room: {
              create: allRoom.map((room_id) => {
                return {
                  room: {
                    connect: {
                      id: room_id,
                    },
                  },
                };
              }),
            },
          },
        }),
        prisma.userProfile.update({
          where: {
            user_id: data.user_id,
          },
          data: {
            payment_id: data.payment_id,
          },
        }),
        prisma.room.updateMany({
          where: {
            id: {
              in: allRoom,
            },
          },
          data: {
            userBooking_id: null,
          },
        }),
      ]);
  } catch (e) {
    console.log(e);
    return NextResponse.error(new Error("Booking failed"), { status: 404 });
  }

  return NextResponse.json({
    message: "Create Customer Booking success",
    status: 200,
  });
}
