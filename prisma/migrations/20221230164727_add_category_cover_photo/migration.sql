-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titleEng" TEXT NOT NULL DEFAULT '',
    "titleEsp" TEXT NOT NULL DEFAULT '',
    "coverPhoto" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Category" ("id", "titleEng", "titleEsp") SELECT "id", "titleEng", "titleEsp" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
