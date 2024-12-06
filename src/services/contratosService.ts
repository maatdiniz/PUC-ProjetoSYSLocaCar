import api from "./api";

export const fetchContratos = async () => {
    const response = await api.get("/contratos");
    return response.data;
};

export const createContrato = async (contrato: any) => {
    const response = await api.post("/contratos", contrato);
    return response.data;
};
