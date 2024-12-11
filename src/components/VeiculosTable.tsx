import React from "react";
import { Button, Table } from 'react-bootstrap';
import ReactDOM from "react-dom";
import { Veiculo } from "@prisma/client";

interface VeiculosTableProps {
veiculos: Veiculo[];
onRemove: (id: number) => void;
}

const VeiculosTable: React.FC<VeiculosTableProps> = ({ veiculos, onRemove }) => {
return (
    <Table striped bordered hover responsive>
        <thead>
        <tr>
        <th>Placa</th>
        <th>Modelo</th>
        <th>Cor</th>
        <th>Status</th>
        <th>Ações</th>
        </tr>
    </thead>
    <tbody>
        {veiculos.map((veiculo) => (
            <tr key={veiculo.id}>
            <td>{veiculo.placa}</td>
            <td>{veiculo.modeloId}</td>
            <td>{veiculo.cor}</td>
            <td>{veiculo.status}</td>
            <td>
            <Button
                variant="danger"
                onClick={() => onRemove(veiculo.id)}
            >
                Remover
            </Button>
            </td>
        </tr>
        ))}
    </tbody>
    </Table>
);
};

export default VeiculosTable;