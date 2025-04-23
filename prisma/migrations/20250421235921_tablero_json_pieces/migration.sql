/*
  Warnings:

  - You are about to drop the `Piece` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BoardToPiece` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pieces` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BoardToPiece" DROP CONSTRAINT "_BoardToPiece_A_fkey";

-- DropForeignKey
ALTER TABLE "_BoardToPiece" DROP CONSTRAINT "_BoardToPiece_B_fkey";

-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "pieces" JSONB NOT NULL;

-- DropTable
DROP TABLE "Piece";

-- DropTable
DROP TABLE "_BoardToPiece";
