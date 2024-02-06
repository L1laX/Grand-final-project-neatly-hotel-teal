/*
  Warnings:

  - You are about to drop the `hotelInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "hotelInfo";

-- CreateTable
CREATE TABLE "hotel_info" (
    "id" SERIAL NOT NULL,
    "hotelName" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "hotelDescription" TEXT NOT NULL,

    CONSTRAINT "hotel_info_pkey" PRIMARY KEY ("id")
);
