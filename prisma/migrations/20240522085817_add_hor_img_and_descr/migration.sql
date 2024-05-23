/*
  Warnings:

  - You are about to drop the column `img` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `descr` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horizontal_img` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `main_img` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "img",
ADD COLUMN     "descr" TEXT NOT NULL,
ADD COLUMN     "horizontal_img" TEXT NOT NULL,
ADD COLUMN     "main_img" TEXT NOT NULL;
