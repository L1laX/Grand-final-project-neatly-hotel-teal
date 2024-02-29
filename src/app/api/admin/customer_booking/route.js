import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = new URL(request.url).searchParams;
  const keywords = searchParams.get("keywords");
  const page = parseInt(searchParams.get("page"), 10) || 0;
  const pageSize = parseInt(searchParams.get("pageSize"), 10) || 10; // Adjusted default pageSize to 10 for practicality
  const skip = page * pageSize;
  console.log("Hello");
  console.log("Fetching customer bookings:", {
    keywords,
    page,
    pageSize,
    skip,
  });

  try {
    const [customerBookings, totalRows] = await prisma.$transaction([
      prisma.customerBooking.findMany({
        skip,
        take: pageSize,
        include: {
          user: true, // Simplify if detailed user info is not required
          customerBooking_room: {
            include: {
              room: true, // Simplify if detailed room info is not required
            },
          },
          bookingRequest: true,
        },
        where: {
          OR: keywords
            ? [
                { customerName: { contains: keywords, mode: "insensitive" } },
                // Add more search conditions here if necessary
              ]
            : undefined,
        },
      }),
      prisma.customerBooking.count({
        where: {
          OR: keywords
            ? [
                { customerName: { contains: keywords, mode: "insensitive" } },
                // Add more count conditions here if necessary
              ]
            : undefined,
        },
      }),
    ]);

    return new Response(
      JSON.stringify({
        success: true,
        data: customerBookings,
        totalRows,

        currentPage: page,
        pageSize,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error fetching customer bookings:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error fetching customer bookings",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
