import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const rooms = await prisma.room.findMany();
  return NextResponse.json(rooms);
}
