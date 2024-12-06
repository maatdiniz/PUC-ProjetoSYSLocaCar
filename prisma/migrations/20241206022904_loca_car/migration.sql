-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "valorLocacao" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Marca" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Marca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modelo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "anoModelo" TIMESTAMP(3) NOT NULL,
    "qtModelo" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "marcaId" INTEGER NOT NULL,

    CONSTRAINT "Modelo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Veiculo" (
    "id" SERIAL NOT NULL,
    "placa" TEXT NOT NULL,
    "chassi" TEXT NOT NULL,
    "anoFabricacao" TIMESTAMP(3) NOT NULL,
    "cor" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "modeloId" INTEGER NOT NULL,

    CONSTRAINT "Veiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manutencao" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataManutencao" TIMESTAMP(3) NOT NULL,
    "valorManutencao" DOUBLE PRECISION NOT NULL,
    "veiculoId" INTEGER NOT NULL,

    CONSTRAINT "Manutencao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContratoLocacao" (
    "id" SERIAL NOT NULL,
    "dataLocacao" TIMESTAMP(3) NOT NULL,
    "dataDevolucao" TIMESTAMP(3) NOT NULL,
    "valorCaucao" DOUBLE PRECISION NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "ContratoLocacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ocorrencia" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataOcorrencia" TIMESTAMP(3) NOT NULL,
    "valorOcorrencia" DOUBLE PRECISION NOT NULL,
    "contratoId" INTEGER NOT NULL,

    CONSTRAINT "Ocorrencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pagamento" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "valorPago" DOUBLE PRECISION NOT NULL,
    "formaPagamento" TEXT NOT NULL,
    "contratoId" INTEGER NOT NULL,

    CONSTRAINT "Pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ContratoLocacaoToVeiculo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ContratoLocacaoToVeiculo_AB_unique" ON "_ContratoLocacaoToVeiculo"("A", "B");

-- CreateIndex
CREATE INDEX "_ContratoLocacaoToVeiculo_B_index" ON "_ContratoLocacaoToVeiculo"("B");

-- AddForeignKey
ALTER TABLE "Modelo" ADD CONSTRAINT "Modelo_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modelo" ADD CONSTRAINT "Modelo_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Veiculo" ADD CONSTRAINT "Veiculo_modeloId_fkey" FOREIGN KEY ("modeloId") REFERENCES "Modelo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manutencao" ADD CONSTRAINT "Manutencao_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ocorrencia" ADD CONSTRAINT "Ocorrencia_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "ContratoLocacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "ContratoLocacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContratoLocacaoToVeiculo" ADD CONSTRAINT "_ContratoLocacaoToVeiculo_A_fkey" FOREIGN KEY ("A") REFERENCES "ContratoLocacao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContratoLocacaoToVeiculo" ADD CONSTRAINT "_ContratoLocacaoToVeiculo_B_fkey" FOREIGN KEY ("B") REFERENCES "Veiculo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
