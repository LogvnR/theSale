/*
  Warnings:

  - You are about to drop the `OrderProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OrderProduct";
PRAGMA foreign_keys=on;

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
    "orderId" TEXT,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("categoryId", "descriptionEng", "descriptionEsp", "id", "isFeatured", "price", "titleEng", "titleEsp") SELECT "categoryId", "descriptionEng", "descriptionEsp", "id", "isFeatured", "price", "titleEng", "titleEsp" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
