import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.room.findMany();
  console.log(data);
  return NextResponse.json(data);
}
