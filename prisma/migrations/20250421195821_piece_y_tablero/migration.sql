-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "movements" INTEGER NOT NULL,
    "modality" TEXT NOT NULL,
    "blackWiner" BOOLEAN,
    "whiteWiner" BOOLEAN,
    "userBlack" TEXT,
    "userWhite" TEXT,
    "game" TEXT NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Piece" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "left" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "top" TEXT NOT NULL,
    "movements" INTEGER NOT NULL,

    CONSTRAINT "Piece_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BoardToPiece" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BoardToPiece_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BoardToPiece_B_index" ON "_BoardToPiece"("B");

-- AddForeignKey
ALTER TABLE "_BoardToPiece" ADD CONSTRAINT "_BoardToPiece_A_fkey" FOREIGN KEY ("A") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardToPiece" ADD CONSTRAINT "_BoardToPiece_B_fkey" FOREIGN KEY ("B") REFERENCES "Piece"("id") ON DELETE CASCADE ON UPDATE CASCADE;
