import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const result = await prisma.room.findMany();
  return NextResponse.json({ message: "GET Methode success", data: result });
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
        create: data.galleryImage.map((gallery) => {
          return { image: gallery };
        }),
      },
    },
  });

  return NextResponse.json({ message: "POST Methode success", data: result });
}
