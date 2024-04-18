/*
  Warnings:

  - Added the required column `video` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Movie_name_key";

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "video" TEXT NOT NULL;
