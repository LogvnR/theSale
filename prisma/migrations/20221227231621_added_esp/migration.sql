/*
  Warnings:

  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Product` table. All the data in the column will be lost.
  - Added the required column `titleEng` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleEsp` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titleEng" TEXT NOT NULL,
    "titleEsp" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL,
    "price" TEXT NOT NULL DEFAULT '0',
    "descriptionEng" TEXT NOT NULL DEFAULT '',
    "descriptionEsp" TEXT NOT NULL DEFAULT '',
    "categoryId" TEXT,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("categoryId", "id", "isFeatured", "price") SELECT "categoryId", "id", "isFeatured", "price" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
