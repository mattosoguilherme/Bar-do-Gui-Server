/*
  Warnings:

  - You are about to drop the column `tablesId` on the `menu` table. All the data in the column will be lost.
  - Added the required column `stock` to the `menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observation` to the `tables` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "menu" DROP CONSTRAINT "menu_tablesId_fkey";

-- AlterTable
ALTER TABLE "menu" DROP COLUMN "tablesId",
ADD COLUMN     "stock" INTEGER NOT NULL;

-- AlterTable
CREATE SEQUENCE "tables_numbertable_seq";
ALTER TABLE "tables" ADD COLUMN     "menuId" TEXT,
ADD COLUMN     "observation" TEXT NOT NULL,
ALTER COLUMN "numberTable" SET DEFAULT nextval('tables_numbertable_seq');
ALTER SEQUENCE "tables_numbertable_seq" OWNED BY "tables"."numberTable";

-- AddForeignKey
ALTER TABLE "tables" ADD CONSTRAINT "tables_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
