/*
  Warnings:

  - You are about to drop the column `activationLink` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isActivated` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_activationLink_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "activationLink",
DROP COLUMN "isActivated";
