-- /*
--   Warnings:

--   - The primary key for the `creditcard` table will be changed. If it partially fails, the table could be left without primary key constraint.
--   - You are about to drop the column `creditcard_id` on the `creditcard` table. All the data in the column will be lost.
--   - The primary key for the `promotion` table will be changed. If it partially fails, the table could be left without primary key constraint.
--   - You are about to drop the column `promotion_id` on the `promotion` table. All the data in the column will be lost.
--   - The primary key for the `room` table will be changed. If it partially fails, the table could be left without primary key constraint.
--   - You are about to drop the column `room_id` on the `room` table. All the data in the column will be lost.
--   - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
--   - You are about to drop the column `user_id` on the `user` table. All the data in the column will be lost.
--   - You are about to drop the `booking_request` table. If the table is not empty, all the data it contains will be lost.
--   - You are about to drop the `customer_booking` table. If the table is not empty, all the data it contains will be lost.
--   - You are about to drop the `hotel_info` table. If the table is not empty, all the data it contains will be lost.
--   - You are about to drop the `room_amminity` table. If the table is not empty, all the data it contains will be lost.
--   - You are about to drop the `room_gallery` table. If the table is not empty, all the data it contains will be lost.
--   - You are about to drop the `user_profile` table. If the table is not empty, all the data it contains will be lost.

-- */
-- -- DropForeignKey
-- ALTER TABLE "booking_request" DROP CONSTRAINT "booking_request_booking_id_fkey";

-- -- DropForeignKey
-- ALTER TABLE "customer_booking" DROP CONSTRAINT "customer_booking_room_id_fkey";

-- -- DropForeignKey
-- ALTER TABLE "customer_booking" DROP CONSTRAINT "customer_booking_user_id_fkey";

-- -- DropForeignKey
-- ALTER TABLE "room_amminity" DROP CONSTRAINT "room_amminity_room_id_fkey";

-- -- DropForeignKey
-- ALTER TABLE "room_gallery" DROP CONSTRAINT "room_gallery_room_id_fkey";

-- -- DropForeignKey
-- ALTER TABLE "user_profile" DROP CONSTRAINT "user_profile_creditCard_id_fkey";

-- -- DropForeignKey
-- ALTER TABLE "user_profile" DROP CONSTRAINT "user_profile_user_id_fkey";

-- -- AlterTable
-- ALTER TABLE "creditcard" DROP CONSTRAINT "creditcard_pkey",
-- DROP COLUMN "creditcard_id",
-- ADD COLUMN     "id" SERIAL NOT NULL,
-- ADD CONSTRAINT "creditcard_pkey" PRIMARY KEY ("id");

-- -- AlterTable
-- ALTER TABLE "promotion" DROP CONSTRAINT "promotion_pkey",
-- DROP COLUMN "promotion_id",
-- ADD COLUMN     "id" SERIAL NOT NULL,
-- ADD CONSTRAINT "promotion_pkey" PRIMARY KEY ("id");

-- -- AlterTable
-- ALTER TABLE "room" DROP CONSTRAINT "room_pkey",
-- DROP COLUMN "room_id",
-- ADD COLUMN     "id" SERIAL NOT NULL,
-- ADD CONSTRAINT "room_pkey" PRIMARY KEY ("id");

-- -- AlterTable
-- ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
-- DROP COLUMN "user_id",
-- ADD COLUMN     "id" SERIAL NOT NULL,
-- ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- -- DropTable
-- DROP TABLE "booking_request";

-- -- DropTable
-- DROP TABLE "customer_booking";

-- -- DropTable
-- DROP TABLE "hotel_info";

-- -- DropTable
-- DROP TABLE "room_amminity";

-- -- DropTable
-- DROP TABLE "room_gallery";

-- -- DropTable
-- DROP TABLE "user_profile";

-- -- CreateTable
-- CREATE TABLE "bookingRequest" (
--     "id" SERIAL NOT NULL,
--     "booking_id" INTEGER NOT NULL,
--     "name" TEXT NOT NULL,
--     "price" INTEGER NOT NULL,

--     CONSTRAINT "bookingRequest_pkey" PRIMARY KEY ("id")
-- );

-- -- CreateTable
-- CREATE TABLE "customerBooking" (
--     "id" SERIAL NOT NULL,
--     "user_id" INTEGER NOT NULL,
--     "customerName" TEXT NOT NULL,
--     "customerEmail" TEXT NOT NULL,
--     "customer_id_number" TEXT NOT NULL,
--     "customerCountry" TEXT NOT NULL,
--     "customerDateOfBirth" TIMESTAMP(3) NOT NULL,
--     "paymentType" TEXT NOT NULL,
--     "paymentStatus" TEXT NOT NULL,
--     "discount" INTEGER NOT NULL,
--     "guestCount" INTEGER NOT NULL,
--     "totalPrice" INTEGER NOT NULL,
--     "additionalRequest" TEXT,
--     "room_id" INTEGER NOT NULL,
--     "checkInDate" TIMESTAMP(3) NOT NULL,
--     "checkOutDate" TIMESTAMP(3) NOT NULL,
--     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     "last_updated_at" TIMESTAMP(3) NOT NULL,

--     CONSTRAINT "customerBooking_pkey" PRIMARY KEY ("id")
-- );

-- -- CreateTable
-- CREATE TABLE "hotelInfo" (
--     "id" SERIAL NOT NULL,
--     "hotelName" TEXT NOT NULL,
--     "image" TEXT NOT NULL,
--     "hotelDescription" TEXT NOT NULL,

--     CONSTRAINT "hotelInfo_pkey" PRIMARY KEY ("id")
-- );

-- -- CreateTable
-- CREATE TABLE "roomAmminity" (
--     "id" SERIAL NOT NULL,
--     "room_id" INTEGER NOT NULL,

--     CONSTRAINT "roomAmminity_pkey" PRIMARY KEY ("id")
-- );

-- -- CreateTable
-- CREATE TABLE "roomGallery" (
--     "id" SERIAL NOT NULL,
--     "room_id" INTEGER NOT NULL,
--     "image" TEXT NOT NULL,

--     CONSTRAINT "roomGallery_pkey" PRIMARY KEY ("id")
-- );

-- -- CreateTable
-- CREATE TABLE "userProfile" (
--     "id" SERIAL NOT NULL,
--     "user_id" INTEGER NOT NULL,
--     "fullName" TEXT NOT NULL,
--     "id_number" TEXT NOT NULL,
--     "dateOfBirth" TIMESTAMP(3) NOT NULL,
--     "country" TEXT NOT NULL,
--     "creditCard_id" INTEGER NOT NULL,

--     CONSTRAINT "userProfile_pkey" PRIMARY KEY ("id")
-- );

-- -- CreateIndex
-- CREATE UNIQUE INDEX "userProfile_user_id_key" ON "userProfile"("user_id");

-- -- CreateIndex
-- CREATE UNIQUE INDEX "userProfile_creditCard_id_key" ON "userProfile"("creditCard_id");

-- -- AddForeignKey
-- ALTER TABLE "bookingRequest" ADD CONSTRAINT "bookingRequest_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "customerBooking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "customerBooking" ADD CONSTRAINT "customerBooking_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "customerBooking" ADD CONSTRAINT "customerBooking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "roomAmminity" ADD CONSTRAINT "roomAmminity_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "roomGallery" ADD CONSTRAINT "roomGallery_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "userProfile" ADD CONSTRAINT "userProfile_creditCard_id_fkey" FOREIGN KEY ("creditCard_id") REFERENCES "creditcard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "userProfile" ADD CONSTRAINT "userProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
