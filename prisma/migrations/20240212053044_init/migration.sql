-- DropForeignKey
ALTER TABLE "bookingRequest" DROP CONSTRAINT "bookingRequest_booking_id_fkey";

-- DropForeignKey
ALTER TABLE "roomAmenity" DROP CONSTRAINT "roomAmenity_room_id_fkey";

-- DropForeignKey
ALTER TABLE "roomGallery" DROP CONSTRAINT "roomGallery_room_id_fkey";

-- AddForeignKey
ALTER TABLE "roomAmenity" ADD CONSTRAINT "roomAmenity_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roomGallery" ADD CONSTRAINT "roomGallery_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookingRequest" ADD CONSTRAINT "bookingRequest_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "customerBooking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
