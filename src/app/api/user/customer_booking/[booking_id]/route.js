import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params: { booking_id } }) {

    const customerBooking = await prisma.user.findUnique({
      where: {
        id: booking_id,
      },
      include:{userProfile:true}
    });
    console.log(customerBooking);
    return NextResponse.json({
      message: "Fetching booking_id data complete!",
      data: customerBooking,
      status: 200,
    });

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
