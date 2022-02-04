/*
  Warnings:

  - You are about to drop the column `menuId` on the `table` table. All the data in the column will be lost.
  - You are about to drop the column `observation` on the `table` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `table` table. All the data in the column will be lost.
  - You are about to drop the column `menuId` on the `user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "table" DROP CONSTRAINT "table_menuId_fkey";

-- DropForeignKey
ALTER TABLE "table" DROP CONSTRAINT "table_userId_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_menuId_fkey";

-- AlterTable
ALTER TABLE "table" DROP COLUMN "menuId",
DROP COLUMN "observation",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "menuId",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'USER',
ADD COLUMN     "tableId" TEXT;

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "menuId" TEXT,
    "tableId" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "table"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "table"("id") ON DELETE SET NULL ON UPDATE CASCADE;
