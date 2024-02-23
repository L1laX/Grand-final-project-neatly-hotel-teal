import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request, response) {
  const { promotionCode } = request.params;

  const deletedPromotion = await prisma.promotion.delete({
    where: {
      promotionCode,
    },
  });

  console.log("promotionCode:", promotionCode);

  return NextResponse.json(
    {
      message: "Promotion deleted!",
    },
    { status: 200 },
  );
}
