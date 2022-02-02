-- AlterTable
ALTER TABLE "user" ADD COLUMN     "tablesId" TEXT;

-- CreateTable
CREATE TABLE "tables" (
    "id" TEXT NOT NULL,
    "numberTable" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tables_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_tablesId_fkey" FOREIGN KEY ("tablesId") REFERENCES "tables"("id") ON DELETE SET NULL ON UPDATE CASCADE;
