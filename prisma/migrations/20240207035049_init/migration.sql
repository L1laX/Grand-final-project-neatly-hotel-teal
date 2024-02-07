-- /*
--   Warnings:

--   - You are about to drop the column `creditCard_id` on the `userProfile` table. All the data in the column will be lost.
--   - You are about to drop the `creditcard` table. If the table is not empty, all the data it contains will be lost.
--   - You are about to drop the `hotelInfo` table. If the table is not empty, all the data it contains will be lost.
--   - Added the required column `name` to the `roomAmminity` table without a default value. This is not possible if the table is not empty.

-- */
-- -- DropForeignKey
-- ALTER TABLE "userProfile" DROP CONSTRAINT "userProfile_creditCard_id_fkey";

-- -- DropIndex
-- DROP INDEX "userProfile_creditCard_id_key";

-- -- AlterTable
-- ALTER TABLE "customerBooking" ADD COLUMN     "promotionCode" TEXT,
-- ALTER COLUMN "discount" DROP NOT NULL,
-- ALTER COLUMN "guestCount" DROP NOT NULL,
-- ALTER COLUMN "totalPrice" DROP NOT NULL,
-- ALTER COLUMN "checkInDate" DROP NOT NULL,
-- ALTER COLUMN "checkOutDate" DROP NOT NULL;

-- -- AlterTable
-- ALTER TABLE "room" ALTER COLUMN "promotionPrice" DROP NOT NULL;

-- -- AlterTable
-- ALTER TABLE "roomAmminity" ADD COLUMN     "name" TEXT NOT NULL;

-- -- AlterTable
-- ALTER TABLE "userProfile" DROP COLUMN "creditCard_id";

-- -- DropTable
-- DROP TABLE "creditcard";

-- -- DropTable
-- DROP TABLE "hotelInfo";

-- -- CreateTable
-- CREATE TABLE "hotel_info" (
--     "id" SERIAL NOT NULL,
--     "hotelName" TEXT NOT NULL,
--     "image" TEXT NOT NULL,
--     "hotelDescription" TEXT NOT NULL,

--     CONSTRAINT "hotel_info_pkey" PRIMARY KEY ("id")
-- );
