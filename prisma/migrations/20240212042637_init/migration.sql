/*
  Warnings:

  - You are about to drop the `roomAmminity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "roomAmminity" DROP CONSTRAINT "roomAmminity_room_id_fkey";

-- DropIndex
DROP INDEX "room_id_key";

-- DropIndex
DROP INDEX "roomGallery_id_key";

-- DropTable
DROP TABLE "roomAmminity";

-- CreateTable
CREATE TABLE "roomAmenity" (
    "id" SERIAL NOT NULL,
    "room_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roomAmenity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "roomAmenity" ADD CONSTRAINT "roomAmenity_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
