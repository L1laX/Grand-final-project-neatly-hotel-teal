/*
  Warnings:

  - The primary key for the `roomGallery` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `paymeny_id` on the `userProfile` table. All the data in the column will be lost.
  - Added the required column `last_updated_at` to the `room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "room" ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "last_updated_at" TIMESTAMPTZ(3) NOT NULL;

-- AlterTable
ALTER TABLE "roomGallery" DROP CONSTRAINT "roomGallery_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "roomGallery_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "roomGallery_id_seq";

-- AlterTable
ALTER TABLE "userProfile" DROP COLUMN "paymeny_id",
ADD COLUMN     "payment_id" TEXT;
