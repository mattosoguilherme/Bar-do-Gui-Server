/*
  Warnings:

  - You are about to drop the column `total` on the `table` table. All the data in the column will be lost.
  - Added the required column `updateAt` to the `table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "table" DROP COLUMN "total",
ADD COLUMN     "adult" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bill" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "kid" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_client" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;
