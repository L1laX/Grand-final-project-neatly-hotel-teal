-- CreateTable
CREATE TABLE "hotelInfo" (
    "id" SERIAL NOT NULL,
    "hotelName" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "hotelDescription" TEXT NOT NULL,

    CONSTRAINT "hotelInfo_pkey" PRIMARY KEY ("id")
);
