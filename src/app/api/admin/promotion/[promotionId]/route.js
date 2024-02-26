import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request, { params: { promotionId } }) {
  try {
    const result = await prisma.promotion.delete({
      where: {
        id: promotionId,
      },
    });
    return NextResponse.json(
      { message: "DELETE Methode success", data: result },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.error(new Error("Promotion not found"), {
      status: 404,
    });
  }
}
