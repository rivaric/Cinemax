/*
  Warnings:

  - You are about to drop the column `estimations` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `rated_films` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "estimations";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "rated_films";

-- CreateTable
CREATE TABLE "UserMovieRating" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "UserMovieRating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserMovieRating_userId_movieId_key" ON "UserMovieRating"("userId", "movieId");

-- AddForeignKey
ALTER TABLE "UserMovieRating" ADD CONSTRAINT "UserMovieRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMovieRating" ADD CONSTRAINT "UserMovieRating_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
