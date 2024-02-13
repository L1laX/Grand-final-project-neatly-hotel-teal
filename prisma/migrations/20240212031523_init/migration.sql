/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `bookingRequest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `customerBooking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `hotel_info` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `promotion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `room` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `roomAmminity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `roomGallery` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `userProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_number]` on the table `userProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "customerBooking" ADD COLUMN     "order_id" TEXT,
ADD COLUMN     "session_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "bookingRequest_id_key" ON "bookingRequest"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customerBooking_id_key" ON "customerBooking"("id");

-- CreateIndex
CREATE UNIQUE INDEX "hotel_info_id_key" ON "hotel_info"("id");

-- CreateIndex
CREATE UNIQUE INDEX "promotion_id_key" ON "promotion"("id");

-- CreateIndex
CREATE UNIQUE INDEX "room_id_key" ON "room"("id");

-- CreateIndex
CREATE UNIQUE INDEX "roomAmminity_id_key" ON "roomAmminity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "roomGallery_id_key" ON "roomGallery"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "userProfile_id_key" ON "userProfile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "userProfile_id_number_key" ON "userProfile"("id_number");
