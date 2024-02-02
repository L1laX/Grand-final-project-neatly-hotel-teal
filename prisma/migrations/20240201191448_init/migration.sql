/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `userprofile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[creditCard_id]` on the table `userprofile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userprofile_user_id_key" ON "userprofile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "userprofile_creditCard_id_key" ON "userprofile"("creditCard_id");

-- AddForeignKey
ALTER TABLE "userprofile" ADD CONSTRAINT "userprofile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userprofile" ADD CONSTRAINT "userprofile_creditCard_id_fkey" FOREIGN KEY ("creditCard_id") REFERENCES "creditcard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
