/*
  Warnings:

  - The `rating` column on the `UserMovieRating` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UserMovieRating" DROP COLUMN "rating",
ADD COLUMN     "rating" INTEGER[];
