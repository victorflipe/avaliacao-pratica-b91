/*
  Warnings:

  - Added the required column `nivel_risco` to the `Transacao` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NivelRisco" AS ENUM ('MEDIO', 'BAIXO', 'ALTO');

-- AlterTable
ALTER TABLE "Transacao" ADD COLUMN     "nivel_risco" "NivelRisco" NOT NULL;
