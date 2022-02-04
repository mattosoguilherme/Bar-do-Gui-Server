/*
  Warnings:

  - You are about to drop the `_MenuToTable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MenuToTable" DROP CONSTRAINT "_MenuToTable_A_fkey";

-- DropForeignKey
ALTER TABLE "_MenuToTable" DROP CONSTRAINT "_MenuToTable_B_fkey";

-- DropTable
DROP TABLE "_MenuToTable";

-- AddForeignKey
ALTER TABLE "table" ADD CONSTRAINT "table_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
