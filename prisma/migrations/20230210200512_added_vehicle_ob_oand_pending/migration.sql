-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "isObo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPending" BOOLEAN NOT NULL DEFAULT false;
