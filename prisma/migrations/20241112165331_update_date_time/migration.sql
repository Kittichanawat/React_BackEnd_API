/*
  Warnings:

  - Changed the type of `payTime` on the `BillSale` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "BillSale" DROP COLUMN "payTime",
ADD COLUMN     "payTime" TIMESTAMP(3) NOT NULL;
