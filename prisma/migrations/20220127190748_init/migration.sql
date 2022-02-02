/*
  Warnings:

  - Added the required column `description` to the `menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "menu" ADD COLUMN     "description" TEXT NOT NULL;
