import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Listar todos os veículos
router.get("/", async (req, res) => {
try {
    const veiculos = await prisma.veiculo.findMany({
        include: {
        modelo: true,
        },
    });
    res.json(veiculos);
} catch (error) {
    res.status(500).json({ error: "Erro ao buscar veículos." });
}
});

// Criar um veículo
router.post("/", async (req, res) => {
const { placa, chassi, anoFabricacao, cor, status, modeloId } = req.body;
try {
    const veiculo = await prisma.veiculo.create({
        data: {
        placa,
        chassi,
        anoFabricacao: new Date(anoFabricacao),
        cor,
        status,
        modelo: {
            connect: { id: modeloId },
        },
        },
    });
    res.json(veiculo);
} catch (error) {
    res.status(500).json({ error: "Erro ao criar veículo." });
}
});

export default router;
