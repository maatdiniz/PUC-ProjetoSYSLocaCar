import React from "react";
import { Button, Table } from "react-bootstrap";

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

// Definição do tipo das props do componente
interface ContratosTableProps {
  contratos: Contrato[];
}

const ContratosTable: React.FC<ContratosTableProps> = ({ contratos }) => {
  return (
    <div>
      <h3>Contratos de Locação</h3>
      {contratos.length > 0 ? (
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
