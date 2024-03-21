/*
  Warnings:

  - Added the required column `img` to the `Actor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img` to the `Director` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Actor" ADD COLUMN     "img" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Director" ADD COLUMN     "img" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "img" TEXT NOT NULL;
