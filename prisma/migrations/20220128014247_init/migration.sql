/*
  Warnings:

  - You are about to drop the column `userId` on the `menu` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "menu" DROP CONSTRAINT "menu_userId_fkey";

-- AlterTable
ALTER TABLE "menu" DROP COLUMN "userId",
ADD COLUMN     "tablesId" TEXT;

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_tablesId_fkey" FOREIGN KEY ("tablesId") REFERENCES "tables"("id") ON DELETE SET NULL ON UPDATE CASCADE;
