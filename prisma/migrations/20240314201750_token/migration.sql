-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userId_fkey";

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
