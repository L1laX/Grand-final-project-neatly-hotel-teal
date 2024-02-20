import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params: { room_id } }) {
  try {
    const result = await prisma.room.findUnique({
      where: {
        id: room_id,
      },
      include: {
        roomAmenity: true,
        roomGallery: true,
      },
    });
    if (!result) {
      return NextResponse.error(new Error("Room not found"));
    }
    const amenity = result.roomAmenity.map((amenity) => amenity.name);
    const gallery = result.roomGallery.map((gallery) => gallery.image);
    const data = {
      ...result,
      roomAmenity: amenity,
      roomGallery: gallery,
    };
    return NextResponse.json(
      { message: "GET Methode success", data: data },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.error(new Error("Room not found"), { status: 404 });
  }
}

export async function PUT(request, { params: { room_id } }) {
  const body = await request.json();
  const { roomAmenity, roomGallery, ...data } = body;

  try {
    const deleteRoomAmenity = await prisma.roomAmenity.deleteMany({
      where: {
        room_id: room_id,
      },
    });
    const deleteRoomGallery = await prisma.roomGallery.deleteMany({
      where: {
        room_id: room_id,
      },
    });
    const result = await prisma.room.update({
      where: {
        id: room_id,
      },
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
          create: roomAmenity.map((amenity) => ({ name: amenity })),
        },
        roomGallery: {
          create: roomGallery.map((image) => ({ image: image })),
        },
      },
    });
    return NextResponse.json(
      { message: "PUT Methode success", data: result },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.error(new Error("Room not found"), { status: 404 });
  }
}

export async function DELETE(request, { params: { room_id } }) {
  try {
    const result = await prisma.room.delete({
      where: {
        id: room_id,
      },
    });
    return NextResponse.json(
      { message: "DELETE Methode success", data: result },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.error(new Error("Room not found"), { status: 404 });
  }
}
