/*
  Warnings:

  - You are about to drop the column `color` on the `Vehicle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "color",
ADD COLUMN     "colorEng" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "colorEsp" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "transmission" TEXT NOT NULL DEFAULT '';
