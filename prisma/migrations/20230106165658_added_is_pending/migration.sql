-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titleEng" TEXT NOT NULL,
    "titleEsp" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "price" TEXT NOT NULL DEFAULT '0',
    "descriptionEng" TEXT NOT NULL DEFAULT '',
    "descriptionEsp" TEXT NOT NULL DEFAULT '',
    "categoryId" TEXT,
    "orderId" TEXT,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("categoryId", "descriptionEng", "descriptionEsp", "id", "isFeatured", "orderId", "price", "titleEng", "titleEsp") SELECT "categoryId", "descriptionEng", "descriptionEsp", "id", "isFeatured", "orderId", "price", "titleEng", "titleEsp" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
