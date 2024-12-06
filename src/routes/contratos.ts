import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Rota para listar todos os contratos
router.get("/", async (req, res) => {
try {
    const contratos = await prisma.contratoLocacao.findMany({
        include: {
        veiculos: {
            include: {
            modelo: true,
            },
        },
        ocorrencias: true,
        pagamentos: true,
        },
    });
    res.json(contratos);
} catch (error) {
    res.status(500).json({ error: "Erro ao buscar contratos." });
}
});

// Rota para criar um contrato de locação
router.post("/", async (req, res) => {
    const { dataLocacao, dataDevolucao, valorCaucao, valorTotal, status, veiculosIds } = req.body;
    try {
    const contrato = await prisma.contratoLocacao.create({
        data: {
        dataLocacao: new Date(dataLocacao),
        dataDevolucao: new Date(dataDevolucao),
        valorCaucao,
        valorTotal,
        status,
        veiculos: {
            connect: veiculosIds.map((id: number) => ({ id })),
        },
        },
    });
    res.json(contrato);
} catch (error) {
    res.status(500).json({ error: "Erro ao criar contrato." });
}
});

export default router;
