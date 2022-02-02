/*
  Warnings:

  - You are about to drop the `tables` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tables" DROP CONSTRAINT "tables_menuId_fkey";

-- DropForeignKey
ALTER TABLE "tables" DROP CONSTRAINT "tables_userId_fkey";

-- DropTable
DROP TABLE "tables";

-- CreateTable
CREATE TABLE "table" (
    "id" TEXT NOT NULL,
    "numberTable" SERIAL NOT NULL,
    "observation" TEXT NOT NULL,
    "userId" TEXT,
    "menuId" TEXT,

    CONSTRAINT "table_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "table" ADD CONSTRAINT "table_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "table" ADD CONSTRAINT "table_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
