import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const keywords = searchParams.get("keywords");
  const checked = keywords.replace(" ", " | ");
  console.log(checked);

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

export async function POST(request) {
  const data = await request.json();
  if (!data) {
    return NextResponse.error(new Error("Data not found"));
  }

  const result = await prisma.room.create({
    data: {
      name: data.name,
      pricePerNight: +data.pricePerNight,
      promotionPrice: +data.promotionPrice,
      guests: +data.guests,
      bedType: data.bedType,
      size: data.size,
      description: data.description,
      status: data.status,
      roomMainImage: data.roomMainImage,
      roomAmenity: {
        create: data.roomAmenity.map((amenity) => {
          return { name: amenity };
        }),
      },
      roomGallery: {
        create: data.roomGallery.map((image) => {
          return { image: image };
        }),
      },
    },
  });

  return NextResponse.json(
    { message: "POST Methode success", data: result },
    { status: 200 },
  );
}
