import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const keywords = searchParams.get("keywords");
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");
  console.log(offset);
  const query = keywords
    ? {
        where: {
          name: {
            startsWith: keywords,
            mode: "insensitive",
          },
        },
        take: +limit,
        skip: +offset * +limit,
      }
    : {
        take: +limit,
        skip: +offset * +limit,
      };
  const pageQuery = keywords
    ? {
        where: {
          name: {
            startsWith: keywords,
            mode: "insensitive",
          },
        },
      }
    : {};

  try {
    const result = await prisma.room.findMany(query);
    const totalPage = Math.ceil(await prisma.room.count(pageQuery));

    return NextResponse.json({
      message: "GET Methode success",
      data: result,
      totalPage: totalPage,
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
