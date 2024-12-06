import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

// Definindo o tipo dos contratos
type Contrato = {
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

const ContratosTable: React.FC = () => {
    const [contratos, setContratos] = useState<Contrato[]>([]);
    const [isLoading, setIsLoading] = useState(true);

  // Função para buscar contratos do backend
const fetchContratos = async () => {
    try {
        const response = await axios.get("/api/contratos"); // Substitua pela URL correta
        setContratos(response.data);
    } catch (error) {
        console.error("Erro ao buscar contratos:", error);
    } finally {
        setIsLoading(false);
    }
};

useEffect(() => {
    fetchContratos();
}, []);

return (
    <div>
        <h3>Contratos de Locação</h3>
        {isLoading ? (
            <p>Carregando...</p>
        ) : contratos.length > 0 ? (
            <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Data Locação</th>
                    <th>Data Devolução</th>
                    <th>Valor Caução (R$)</th>
                    <th>Valor Total (R$)</th>
                    <th>Status</th>
                    <th>Veículos</th>
                    <th>Ações</th>
                </tr>
        </thead>
        <tbody>
            {contratos.map((contrato) => (
                <tr key={contrato.id}>
                    <td>{contrato.id}</td>
                    <td>{new Date(contrato.dataLocacao).toLocaleDateString()}</td>
                    <td>{new Date(contrato.dataDevolucao).toLocaleDateString()}</td>
                    <td>{contrato.valorCaucao.toFixed(2)}</td>
                    <td>{contrato.valorTotal.toFixed(2)}</td>
                    <td>{contrato.status}</td>
                    <td>
                    {contrato.veiculos.map((veiculo) => (
                        <div key={veiculo.id}>
                            {veiculo.placa} - {veiculo.modelo.nome}
                        </div>
                    ))}
                </td>
                <td>
                    <Button variant="warning" size="sm">
                        Editar
                    </Button>{" "}
                    <Button variant="danger" size="sm">
                        Excluir
                    </Button>
                    </td>
                </tr>
            ))}
        </tbody>
        </Table>
    ) : (
        <p>Nenhum contrato encontrado.</p>
    )}
    </div>
);
};

export default ContratosTable;
