-- CreateEnum
CREATE TYPE "TipoTransacao" AS ENUM ('CREDITO', 'DEBITO');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('APROVADA', 'REPROVADA');

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nome_fantasia" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transacao" (
    "id" SERIAL NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "data" TIMESTAMP(3),
    "parcela" INTEGER NOT NULL,
    "taxa" DECIMAL(65,30) NOT NULL,
    "valor_liquido" DECIMAL(65,30),
    "status" "Status",
    "tipo_transacao" "TipoTransacao" NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "Transacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cnpj_key" ON "Cliente"("cnpj");

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
