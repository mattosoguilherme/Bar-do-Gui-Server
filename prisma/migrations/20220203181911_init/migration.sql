-- DropForeignKey
ALTER TABLE "table" DROP CONSTRAINT "table_menuId_fkey";

-- CreateTable
CREATE TABLE "_MenuToTable" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MenuToTable_AB_unique" ON "_MenuToTable"("A", "B");

-- CreateIndex
CREATE INDEX "_MenuToTable_B_index" ON "_MenuToTable"("B");

-- AddForeignKey
ALTER TABLE "_MenuToTable" ADD FOREIGN KEY ("A") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuToTable" ADD FOREIGN KEY ("B") REFERENCES "table"("id") ON DELETE CASCADE ON UPDATE CASCADE;
