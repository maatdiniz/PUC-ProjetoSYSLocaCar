import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Veiculo, ContratoLocacao } from "@prisma/client";

interface ContratoFormProps {
  onSubmit: (contrato: {
    dataLocacao: string;
    dataDevolucao: string;
    valorCaucao: number;
    valorTotal: number;
    status: string;
    veiculos: string[];
  }) => void;
}

const ContratoForm: React.FC<ContratoFormProps> = ({ onSubmit }) => {
  const [contrato, setContrato] = useState({
    dataLocacao: "",
    dataDevolucao: "",
    valorCaucao: 0,
    valorTotal: 0,
    status: "Aberto",
    veiculos: [] as string[],
  });

  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

  // Fetch veículos do backend
  useEffect(() => {
    const fetchVeiculos = async () => {
      try {
        const response = await axios.get<Veiculo[]>("/api/veiculos");
        setVeiculos(response.data);
      } catch (error) {
        console.error("Erro ao buscar veículos:", error);
      }
    };
    fetchVeiculos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContrato((prev) => ({
      ...prev,
      [name]: name === "valorCaucao" || name === "valorTotal" ? parseFloat(value) : value,
    }));
  };

  const handleVeiculosChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedVeiculos = Array.from(e.target.selectedOptions, (option) => option.value);
    setContrato((prev) => ({
      ...prev,
      veiculos: selectedVeiculos,
    }));
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
              value={contrato.dataLocacao}
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
              value={contrato.dataDevolucao}
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
              value={contrato.valorCaucao}
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
              value={contrato.valorTotal}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group>
  <Form.Label>Veículos</Form.Label>
  <select
    multiple
    name="veiculos"
    value={contrato.veiculos}
    onChange={handleVeiculosChange}
    className="form-control" // Garantir o estilo
  >
    {veiculos.map((veiculo) => (
      <option key={veiculo.id} value={veiculo.id}>
        {veiculo.placa} - {veiculo.status}
      </option>
    ))}
  </select>
</Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Salvar Contrato
      </Button>
    </Form>
  );
};

export default ContratoForm;
