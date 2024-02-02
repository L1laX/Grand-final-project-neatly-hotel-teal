-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT;

-- CreateTable
CREATE TABLE "room" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "bedType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "checkInDate" TIMESTAMP(3),
    "checkOutDate" TIMESTAMP(3),
    "guests" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "roomMainImage" TEXT NOT NULL,
    "pricePerNight" INTEGER NOT NULL,
    "promotionPrice" INTEGER NOT NULL,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);
