-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'USER',
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu" (
    "id" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "table" (
    "id" TEXT NOT NULL,
    "numberTable" SERIAL NOT NULL,
    "observation" TEXT NOT NULL DEFAULT E'',
    "adult" INTEGER NOT NULL DEFAULT 0,
    "bill" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kid" INTEGER NOT NULL DEFAULT 0,
    "total_client" INTEGER NOT NULL DEFAULT 0,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "close" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,

    CONSTRAINT "table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "menuId" TEXT,
    "tableId" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "observation" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToMenu" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToMenu_AB_unique" ON "_CategoryToMenu"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToMenu_B_index" ON "_CategoryToMenu"("B");

-- AddForeignKey
ALTER TABLE "table" ADD CONSTRAINT "table_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "table"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToMenu" ADD FOREIGN KEY ("A") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToMenu" ADD FOREIGN KEY ("B") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
