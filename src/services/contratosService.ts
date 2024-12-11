import api from "./api";

// Define o tipo Contrato para tipagem adequada
export type Contrato = {
  id: number;
  dataLocacao: string;
  dataDevolucao: string;
  valorCaucao: number;
  valorTotal: number;
  status: string;
  veiculos: {
    id: number;
    placa: string;
    modelo: {
      nome: string;
    };
  }[];
};

// Função para buscar contratos
export const fetchContratos = async (): Promise<Contrato[]> => {
  try {
    const response = await api.get<Contrato[]>("/contratos");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar contratos:", error);
    throw error;
  }
};

// Função para criar um novo contrato
export const createContrato = async (contrato: Partial<Contrato>): Promise<Contrato> => {
  try {
const response = await api.post<Contrato>("/contratos", contrato);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar contrato:", error);
    throw error;
  }
};

// Função para atualizar um contrato existente
export const updateContrato = async (id: number, contrato: Partial<Contrato>): Promise<Contrato> => {
  try {
    const response = await api.put<Contrato>(`/contratos/${id}`, contrato);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar contrato:", error);
    throw error;
  }
};

// Função para excluir um contrato
export const deleteContrato = async (id: number): Promise<void> => {
  try {
    await api.delete(`/contratos/${id}`);
  } catch (error) {
    console.error("Erro ao excluir contrato:", error);
    throw error;
  }
};
