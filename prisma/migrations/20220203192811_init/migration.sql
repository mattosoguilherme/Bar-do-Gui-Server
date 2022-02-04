/*
  Warnings:

  - You are about to drop the column `menuId` on the `table` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "table" DROP CONSTRAINT "table_menuId_fkey";

-- AlterTable
ALTER TABLE "menu" ADD COLUMN     "tableId" TEXT;

-- AlterTable
ALTER TABLE "table" DROP COLUMN "menuId";

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "table"("id") ON DELETE SET NULL ON UPDATE CASCADE;
