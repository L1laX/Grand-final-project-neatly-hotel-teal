-- CreateTable
CREATE TABLE "UserProfile" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "id_number" INTEGER NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "country" TEXT NOT NULL,
    "creditCard_id" INTEGER NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credit_Card" (
    "id" SERIAL NOT NULL,
    "cardNumber" INTEGER NOT NULL,
    "cardOwner" TEXT NOT NULL,
    "expiryDate" INTEGER NOT NULL,
    "cvc_cvv" INTEGER NOT NULL,

    CONSTRAINT "Credit_Card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_creditCard_id_fkey" FOREIGN KEY ("creditCard_id") REFERENCES "Credit_Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
