/*
  Warnings:

  - The primary key for the `bookingRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `customerBooking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `session_id` on the `customerBooking` table. All the data in the column will be lost.
  - The primary key for the `hotel_info` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `promotion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `roomAmenity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `userProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `room` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `roomAmenity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `roomGallery` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "bookingRequest" DROP CONSTRAINT "bookingRequest_booking_id_fkey";

-- DropForeignKey
ALTER TABLE "customerBooking" DROP CONSTRAINT "customerBooking_room_id_fkey";

-- DropForeignKey
ALTER TABLE "customerBooking" DROP CONSTRAINT "customerBooking_user_id_fkey";

-- DropForeignKey
ALTER TABLE "roomAmenity" DROP CONSTRAINT "roomAmenity_room_id_fkey";

-- DropForeignKey
ALTER TABLE "roomGallery" DROP CONSTRAINT "roomGallery_room_id_fkey";

-- DropForeignKey
ALTER TABLE "userProfile" DROP CONSTRAINT "userProfile_user_id_fkey";

-- AlterTable
ALTER TABLE "bookingRequest" DROP CONSTRAINT "bookingRequest_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "booking_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "bookingRequest_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "bookingRequest_id_seq";

-- AlterTable
ALTER TABLE "customerBooking" DROP CONSTRAINT "customerBooking_pkey",
DROP COLUMN "session_id",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "customerDateOfBirth" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "room_id" DROP NOT NULL,
ALTER COLUMN "room_id" SET DATA TYPE TEXT,
ALTER COLUMN "checkInDate" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "checkOutDate" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "last_updated_at" SET DATA TYPE TIMESTAMPTZ(3),
ADD CONSTRAINT "customerBooking_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "customerBooking_id_seq";

-- AlterTable
ALTER TABLE "hotel_info" DROP CONSTRAINT "hotel_info_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "hotel_info_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "hotel_info_id_seq";

-- AlterTable
ALTER TABLE "promotion" DROP CONSTRAINT "promotion_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "promotion_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "promotion_id_seq";

-- AlterTable
ALTER TABLE "room" DROP CONSTRAINT "room_pkey",
ALTER COLUMN "checkInDate" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "checkOutDate" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "room_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "room_id_seq";

-- AlterTable
ALTER TABLE "roomAmenity" DROP CONSTRAINT "roomAmenity_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "room_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "roomAmenity_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "roomAmenity_id_seq";

-- AlterTable
ALTER TABLE "roomGallery" ALTER COLUMN "room_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_id_seq";

-- AlterTable
ALTER TABLE "userProfile" DROP CONSTRAINT "userProfile_pkey",
ADD COLUMN     "paymeny_id" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "dateOfBirth" SET DATA TYPE TIMESTAMPTZ(3),
ADD CONSTRAINT "userProfile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "userProfile_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "room_id_key" ON "room"("id");

-- CreateIndex
CREATE UNIQUE INDEX "roomAmenity_id_key" ON "roomAmenity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "roomGallery_id_key" ON "roomGallery"("id");

-- AddForeignKey
ALTER TABLE "userProfile" ADD CONSTRAINT "userProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roomAmenity" ADD CONSTRAINT "roomAmenity_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roomGallery" ADD CONSTRAINT "roomGallery_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerBooking" ADD CONSTRAINT "customerBooking_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerBooking" ADD CONSTRAINT "customerBooking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookingRequest" ADD CONSTRAINT "bookingRequest_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "customerBooking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
