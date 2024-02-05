/*
  Warnings:

  - The primary key for the `creditcard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `creditcard` table. All the data in the column will be lost.
  - The primary key for the `room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `room` table. All the data in the column will be lost.
  - You are about to drop the `CustomerBooking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hotelInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userprofile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "userprofile" DROP CONSTRAINT "userprofile_creditCard_id_fkey";

-- DropForeignKey
ALTER TABLE "userprofile" DROP CONSTRAINT "userprofile_user_id_fkey";

-- AlterTable
ALTER TABLE "creditcard" DROP CONSTRAINT "creditcard_pkey",
DROP COLUMN "id",
ADD COLUMN     "creditcard_id" SERIAL NOT NULL,
ADD CONSTRAINT "creditcard_pkey" PRIMARY KEY ("creditcard_id");

-- AlterTable
ALTER TABLE "room" DROP CONSTRAINT "room_pkey",
DROP COLUMN "id",
ADD COLUMN     "room_id" SERIAL NOT NULL,
ADD CONSTRAINT "room_pkey" PRIMARY KEY ("room_id");

-- DropTable
DROP TABLE "CustomerBooking";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "hotelInfo";

-- DropTable
DROP TABLE "userprofile";

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_profile" (
    "user_profile_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "id_number" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "country" TEXT NOT NULL,
    "creditCard_id" INTEGER NOT NULL,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("user_profile_id")
);

-- CreateTable
CREATE TABLE "room_amminity" (
    "room_amminity_id" SERIAL NOT NULL,
    "room_id" INTEGER NOT NULL,

    CONSTRAINT "room_amminity_pkey" PRIMARY KEY ("room_amminity_id")
);

-- CreateTable
CREATE TABLE "room_gallery" (
    "room_gallery_id" SERIAL NOT NULL,
    "room_id" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "room_gallery_pkey" PRIMARY KEY ("room_gallery_id")
);

-- CreateTable
CREATE TABLE "customer_booking" (
    "customer_booking_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customer_id_number" TEXT NOT NULL,
    "customerCountry" TEXT NOT NULL,
    "customerDateOfBirth" TIMESTAMP(3) NOT NULL,
    "paymentType" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "discount" INTEGER NOT NULL,
    "guestCount" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "additionalRequest" TEXT,
    "room_id" INTEGER NOT NULL,
    "checkInDate" TIMESTAMP(3) NOT NULL,
    "checkOutDate" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_booking_pkey" PRIMARY KEY ("customer_booking_id")
);

-- CreateTable
CREATE TABLE "booking_request" (
    "booking_request_id" SERIAL NOT NULL,
    "booking_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "booking_request_pkey" PRIMARY KEY ("booking_request_id")
);

-- CreateTable
CREATE TABLE "hotel_info" (
    "hotel_info_id" SERIAL NOT NULL,
    "hotelName" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "hotelDescription" TEXT NOT NULL,

    CONSTRAINT "hotel_info_pkey" PRIMARY KEY ("hotel_info_id")
);

-- CreateTable
CREATE TABLE "promotion" (
    "promotion_id" SERIAL NOT NULL,
    "promotionCode" TEXT NOT NULL,
    "discount" INTEGER NOT NULL,

    CONSTRAINT "promotion_pkey" PRIMARY KEY ("promotion_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_user_id_key" ON "user_profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_creditCard_id_key" ON "user_profile"("creditCard_id");

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_creditCard_id_fkey" FOREIGN KEY ("creditCard_id") REFERENCES "creditcard"("creditcard_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_amminity" ADD CONSTRAINT "room_amminity_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_gallery" ADD CONSTRAINT "room_gallery_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_booking" ADD CONSTRAINT "customer_booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_booking" ADD CONSTRAINT "customer_booking_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_request" ADD CONSTRAINT "booking_request_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "customer_booking"("customer_booking_id") ON DELETE RESTRICT ON UPDATE CASCADE;
