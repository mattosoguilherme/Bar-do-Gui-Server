/*
  Warnings:

  - You are about to alter the column `bill` on the `table` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "table" ALTER COLUMN "bill" SET DATA TYPE DOUBLE PRECISION;
