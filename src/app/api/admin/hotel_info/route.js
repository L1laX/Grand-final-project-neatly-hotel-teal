import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const hotelDetails = await prisma.hotel_info.findMany({
      select: {
        id: true,
        hotelName: true,
        image: true,
        hotelDescription: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: hotelDetails,
    });
  } catch (error) {
    console.error("Error fetching hotel details:", error);
    return NextResponse.error("Error fetching hotel details");
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    const { hotelName, hotelDescription, image } = data;

    if (!hotelName || !hotelDescription) {
      return NextResponse.error("hotelName and hotelDescription are required", {
        status: 400,
      });
    }

    const createdHotel = await prisma.hotel_info.create({
      data: {
        hotelName,
        hotelDescription,
        image,
      },
    });

    return NextResponse.json({
      success: true,
      data: createdHotel,
    });
  } catch (error) {
    console.error("Error submitting hotel information:", error);

    if (
      error.code === "P2002" &&
      error.meta?.target?.includes("unique constraint failed")
    ) {
      return NextResponse.error(
        "Duplicate entry. Hotel with the same name already exists.",
      );
    }

    return NextResponse.error(
      `Error submitting hotel information: ${error.message}`,
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request) {
  try {
    const { id, hotelName, hotelDescription, image } = await request.json();

    // Validate if required fields are present
    if (!id || !hotelName || !hotelDescription) {
      return NextResponse.error(
        "id, hotelName, and hotelDescription are required",
        {
          status: 400,
        },
      );
    }

    // Update the hotel information in the database
    const updatedHotel = await prisma.hotel_info.update({
      where: { id },
      data: {
        hotelName,
        hotelDescription,
        image,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedHotel,
    });
  } catch (error) {
    console.error("Error updating hotel information:", error);
    return NextResponse.error(
      `Error updating hotel information: ${error.message}`,
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE method to delete hotel information
export async function DELETE(request) {
  try {
    const { id } = await request.json();

    // Validate if required fields are present
    if (!id) {
      return NextResponse.error("id is required", {
        status: 400,
      });
    }

    // Delete the hotel information from the database
    const deletedHotel = await prisma.hotel_info.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      data: deletedHotel,
    });
  } catch (error) {
    console.error("Error deleting hotel information:", error);
    return NextResponse.error(
      `Error deleting hotel information: ${error.message}`,
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
