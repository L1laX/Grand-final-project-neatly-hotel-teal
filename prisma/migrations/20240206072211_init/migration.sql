/*
  Warnings:

  - The primary key for the `booking_request` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `booking_request_id` on the `booking_request` table. All the data in the column will be lost.
  - The primary key for the `creditcard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `creditcard_id` on the `creditcard` table. All the data in the column will be lost.
  - The primary key for the `customer_booking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `customer_booking_id` on the `customer_booking` table. All the data in the column will be lost.
  - The primary key for the `hotel_info` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `hotel_info_id` on the `hotel_info` table. All the data in the column will be lost.
  - The primary key for the `promotion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `promotion_id` on the `promotion` table. All the data in the column will be lost.
  - The primary key for the `room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `room_id` on the `room` table. All the data in the column will be lost.
  - The primary key for the `room_amminity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `room_amminity_id` on the `room_amminity` table. All the data in the column will be lost.
  - The primary key for the `room_gallery` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `room_gallery_id` on the `room_gallery` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `user` table. All the data in the column will be lost.
  - The primary key for the `user_profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_profile_id` on the `user_profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "booking_request" DROP CONSTRAINT "booking_request_booking_id_fkey";

-- DropForeignKey
ALTER TABLE "customer_booking" DROP CONSTRAINT "customer_booking_room_id_fkey";

-- DropForeignKey
ALTER TABLE "customer_booking" DROP CONSTRAINT "customer_booking_user_id_fkey";

-- DropForeignKey
ALTER TABLE "room_amminity" DROP CONSTRAINT "room_amminity_room_id_fkey";

-- DropForeignKey
ALTER TABLE "room_gallery" DROP CONSTRAINT "room_gallery_room_id_fkey";

-- DropForeignKey
ALTER TABLE "user_profile" DROP CONSTRAINT "user_profile_creditCard_id_fkey";

-- DropForeignKey
ALTER TABLE "user_profile" DROP CONSTRAINT "user_profile_user_id_fkey";

-- AlterTable
ALTER TABLE "booking_request" DROP CONSTRAINT "booking_request_pkey",
DROP COLUMN "booking_request_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "booking_request_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "creditcard" DROP CONSTRAINT "creditcard_pkey",
DROP COLUMN "creditcard_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "creditcard_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "customer_booking" DROP CONSTRAINT "customer_booking_pkey",
DROP COLUMN "customer_booking_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "customer_booking_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "hotel_info" DROP CONSTRAINT "hotel_info_pkey",
DROP COLUMN "hotel_info_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "hotel_info_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "promotion" DROP CONSTRAINT "promotion_pkey",
DROP COLUMN "promotion_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "promotion_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "room" DROP CONSTRAINT "room_pkey",
DROP COLUMN "room_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "room_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "room_amminity" DROP CONSTRAINT "room_amminity_pkey",
DROP COLUMN "room_amminity_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "room_amminity_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "room_gallery" DROP CONSTRAINT "room_gallery_pkey",
DROP COLUMN "room_gallery_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "room_gallery_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user_profile" DROP CONSTRAINT "user_profile_pkey",
DROP COLUMN "user_profile_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_creditCard_id_fkey" FOREIGN KEY ("creditCard_id") REFERENCES "creditcard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_amminity" ADD CONSTRAINT "room_amminity_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_gallery" ADD CONSTRAINT "room_gallery_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_booking" ADD CONSTRAINT "customer_booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_booking" ADD CONSTRAINT "customer_booking_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_request" ADD CONSTRAINT "booking_request_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "customer_booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
