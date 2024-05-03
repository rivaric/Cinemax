/*
  Warnings:

  - You are about to drop the `Actor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ActorsOnMovies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Director` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DirectorOnMovies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ActorsOnMovies" DROP CONSTRAINT "ActorsOnMovies_actorId_fkey";

-- DropForeignKey
ALTER TABLE "ActorsOnMovies" DROP CONSTRAINT "ActorsOnMovies_movieId_fkey";

-- DropForeignKey
ALTER TABLE "DirectorOnMovies" DROP CONSTRAINT "DirectorOnMovies_directorId_fkey";

-- DropForeignKey
ALTER TABLE "DirectorOnMovies" DROP CONSTRAINT "DirectorOnMovies_movieId_fkey";

-- DropTable
DROP TABLE "Actor";

-- DropTable
DROP TABLE "ActorsOnMovies";

-- DropTable
DROP TABLE "Director";

-- DropTable
DROP TABLE "DirectorOnMovies";
