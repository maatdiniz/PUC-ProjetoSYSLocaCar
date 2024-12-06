import express from "express";
import contratosRoutes from "./contratos";
import veiculosRoutes from "./veiculos";

const router = express.Router();

router.use("/contratos", contratosRoutes);
router.use("/veiculos", veiculosRoutes);

export default router;
