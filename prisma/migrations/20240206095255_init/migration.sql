/*
  Warnings:

  - You are about to drop the `hotel_info` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "hotel_info";

-- CreateTable
CREATE TABLE "hotelInfo" (
    "id" SERIAL NOT NULL,
    "hotelName" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "hotelDescription" TEXT NOT NULL,

    CONSTRAINT "hotelInfo_pkey" PRIMARY KEY ("id")
);
