/*
  Warnings:

  - You are about to drop the column `createAt` on the `tables` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `tables` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tables" DROP COLUMN "createAt",
DROP COLUMN "updateAt";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "menuId" TEXT;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
