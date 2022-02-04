/*
  Warnings:

  - You are about to drop the column `tableId` on the `menu` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "menu" DROP CONSTRAINT "menu_tableId_fkey";

-- AlterTable
ALTER TABLE "menu" DROP COLUMN "tableId";

-- AlterTable
ALTER TABLE "table" ADD COLUMN     "menuId" TEXT;

-- AddForeignKey
ALTER TABLE "table" ADD CONSTRAINT "table_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
