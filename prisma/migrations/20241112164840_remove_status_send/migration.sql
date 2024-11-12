/*
  Warnings:

  - You are about to drop the column `statusSale` on the `BillSale` table. All the data in the column will be lost.
  - You are about to drop the column `statusSend` on the `BillSale` table. All the data in the column will be lost.
  - Added the required column `payTime` to the `BillSale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BillSale" DROP COLUMN "statusSale",
DROP COLUMN "statusSend",
ADD COLUMN     "payTime" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'wait';
