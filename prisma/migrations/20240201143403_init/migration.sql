/*
  Warnings:

  - You are about to drop the `Credit_Card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_creditCard_id_fkey";

-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_user_id_fkey";

-- DropTable
DROP TABLE "Credit_Card";

-- DropTable
DROP TABLE "UserProfile";

-- CreateTable
CREATE TABLE "userprofile" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "id_number" INTEGER NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "country" TEXT NOT NULL,
    "creditCard_id" INTEGER NOT NULL,

    CONSTRAINT "userprofile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creditcard" (
    "id" SERIAL NOT NULL,
    "cardNumber" INTEGER NOT NULL,
    "cardOwner" TEXT NOT NULL,
    "expiryDate" INTEGER NOT NULL,
    "cvc_cvv" INTEGER NOT NULL,

    CONSTRAINT "creditcard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userprofile" ADD CONSTRAINT "userprofile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userprofile" ADD CONSTRAINT "userprofile_creditCard_id_fkey" FOREIGN KEY ("creditCard_id") REFERENCES "creditcard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
