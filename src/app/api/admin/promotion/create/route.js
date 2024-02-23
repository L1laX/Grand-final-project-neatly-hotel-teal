import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  const { promotionCode, discount, name } = await request.json();

  const newPromotion = await prisma.promotion.create({
    data: {
      promotionCode,
      discount,
      name,
    },
  });

  console.log("promotionCode:", promotionCode);
  console.log("discount:", discount);
  console.log("name:", name);

  return NextResponse.json(
    {
      message: "Promotion added!",
    },
    { status: 201 },
  );
}
