import { prisma } from "@/lib/prisma.js";

export async function GET(request) {
  const searchParams = new URL(request.url).searchParams;
  const keywords = searchParams.get("keywords");
  const page = parseInt(searchParams.get("page"));
  const pageSize = parseInt(searchParams.get("pageSize"));
  const skip = page * pageSize;
  try {
    // Defining the whereClause based on keywords
    const whereClause = {};
    if (keywords) {
      whereClause.OR = [
        { customerName: { contains: keywords, mode: "insensitive" } },
        // Add other fields you want to search by, for example:
        // { 'user.email': { contains: keywords, mode: "insensitive" } }
      ];
    }

    // Fetching filtered and paginated customer bookings
    const customerBookings = await prisma.customerBooking.findMany({
      skip,
      take: pageSize,
      include: {
        user: true,
        customerBooking_room: {
          include: {
            room: true,
          },
        },
        bookingRequest: true,
      },
      where: whereClause,
    });

    // Counting the total rows for the given search criteria
    const totalRows = await prisma.customerBooking.count({
      where: whereClause,
    });

    // Calculating the total number of pages
    const totalPages = Math.ceil(totalRows / pageSize);

    return new Response(
      JSON.stringify({
        success: true,
        data: customerBookings,
        totalRows,
        totalPages,
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
