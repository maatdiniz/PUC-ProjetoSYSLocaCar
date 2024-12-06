import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { ContratoLocacao, Veiculo } from "@prisma/client";

interface ContratoFormProps {
onSubmit: (contrato: Partial<ContratoLocacao>) => void;
}

const ContratoForm: React.FC<ContratoFormProps> = ({ onSubmit }) => {
    const [contrato, setContrato] = useState<Partial<ContratoLocacao>>({
        dataLocacao: new Date(),
        dataDevolucao: new Date(),
        valorCaucao: 0,
        valorTotal: 0,
        status: "Aberto",
    });
const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

// Fetch veículos do backend
useEffect(() => {
    axios.get("/api/veiculos").then((res) => setVeiculos(res.data));
}, []);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContrato({ ...contrato, [e.target.name]: e.target.value });
};

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(contrato);
};

return (
    <Form onSubmit={handleSubmit}>
    <Row>
        <Col md={6}>
        <Form.Group>
            <Form.Label>Data de Locação</Form.Label>
            <Form.Control
                type="date"
                name="dataLocacao"
                value={contrato.dataLocacao?.toString()}
                onChange={handleChange}
            />
        </Form.Group>
        </Col>
        <Col md={6}>
        <Form.Group>
            <Form.Label>Data de Devolução</Form.Label>
            <Form.Control
                type="date"
                name="dataDevolucao"
                value={contrato.dataDevolucao?.toString()}
                onChange={handleChange}
            />
        </Form.Group>
        </Col>
    </Row>
    <Row>
        <Col md={6}>
        <Form.Group>
            <Form.Label>Valor Caução</Form.Label>
            <Form.Control
            type="number"
            name="valorCaucao"
            value={contrato.valorCaucao || ""}
            onChange={handleChange}
            />
        </Form.Group>
        </Col>
        <Col md={6}>
        <Form.Group>
            <Form.Label>Valor Total</Form.Label>
            <Form.Control
                type="number"
                name="valorTotal"
                value={contrato.valorTotal || ""}
                onChange={handleChange}
            />
        </Form.Group>
        </Col>
    </Row>
    <Form.Group>
        <Form.Label>Veículos</Form.Label>
        <Form.Control
            as="select"
            multiple
            name="veiculos"
            onChange={(e) =>
            setContrato({
                ...contrato,
                veiculos: Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                ),
            })
            }
        >
        {veiculos.map((veiculo) => (
            <option key={veiculo.id} value={veiculo.id}>
            {veiculo.placa} - {veiculo.status}
            </option>
        ))}
        </Form.Control>
    </Form.Group>
    <Button variant="primary" type="submit" className="mt-3">
        Salvar Contrato
    </Button>
    </Form>
    );
};

export default ContratoForm;