/*
  Warnings:

  - You are about to drop the column `isObo` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `offer` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "isObo",
DROP COLUMN "offer";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "offer" TEXT NOT NULL DEFAULT '0';
