/*
  Warnings:

  - You are about to drop the column `orderId` on the `Vehicle` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "year" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "mileage" TEXT NOT NULL,
    "kilometers" TEXT NOT NULL,
    "fuelEng" TEXT NOT NULL,
    "fuelEsp" TEXT NOT NULL,
    "seats" TEXT NOT NULL,
    "engine" TEXT NOT NULL,
    "drivetrain" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "descriptionEng" TEXT NOT NULL DEFAULT '',
    "descriptionEsp" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Vehicle" ("color", "descriptionEng", "descriptionEsp", "drivetrain", "engine", "fuelEng", "fuelEsp", "id", "kilometers", "make", "mileage", "model", "price", "seats", "type", "year") SELECT "color", "descriptionEng", "descriptionEsp", "drivetrain", "engine", "fuelEng", "fuelEsp", "id", "kilometers", "make", "mileage", "model", "price", "seats", "type", "year" FROM "Vehicle";
DROP TABLE "Vehicle";
ALTER TABLE "new_Vehicle" RENAME TO "Vehicle";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
