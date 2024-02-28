import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const keywords = searchParams.get("keywords");
  try {
    const result = await prisma.room.findMany(
      keywords
        ? {
            where: {
              name: {
                startsWith: keywords,
                mode: "insensitive",
              },
            },
          }
        : {},
    );
    return NextResponse.json({
      message: "GET Methode success",
      data: result,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "error", error: e }, { status: 500 });
  }
}

export async function PUT(request) {
  console.log("PUT request received:", request);
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.error("id and status are required", {
        status: 400,
      });
    }

    const updatedRoom = await prisma.room.update({
      where: { id: +id },
      data: {
        status: status,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedRoom,
    });
  } catch (error) {
    console.error("Error updating room status:", error);
    return NextResponse.error(`Error updating room status: ${error.message}`, {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
