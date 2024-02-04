-- CreateTable
CREATE TABLE "CustomerBooking" (
    "id" SERIAL NOT NULL,
    "customerName" TEXT NOT NULL,
    "guest" INTEGER NOT NULL,
    "roomType" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "bedType" TEXT NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerBooking_pkey" PRIMARY KEY ("id")
);
