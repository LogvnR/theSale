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
    "descriptionEsp" TEXT NOT NULL DEFAULT '',
    "orderId" TEXT,
    CONSTRAINT "Vehicle_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Vehicle" ("color", "descriptionEng", "descriptionEsp", "drivetrain", "engine", "fuelEng", "fuelEsp", "id", "kilometers", "make", "mileage", "model", "price", "seats", "type", "year") SELECT "color", "descriptionEng", "descriptionEsp", "drivetrain", "engine", "fuelEng", "fuelEsp", "id", "kilometers", "make", "mileage", "model", "price", "seats", "type", "year" FROM "Vehicle";
DROP TABLE "Vehicle";
ALTER TABLE "new_Vehicle" RENAME TO "Vehicle";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
