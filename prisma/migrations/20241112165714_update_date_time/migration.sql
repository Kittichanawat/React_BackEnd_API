/*
  Warnings:

  - Changed the type of `payDate` on the `BillSale` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "BillSale" DROP COLUMN "payDate",
ADD COLUMN     "payDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "payTime" SET DATA TYPE TEXT;
