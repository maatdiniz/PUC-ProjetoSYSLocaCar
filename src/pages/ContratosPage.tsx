import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ContratosTable from "../components/ContratosTable";
import { fetchContratos } from "../services/contratosService";

const ContratosPage: React.FC = () => {
    const [contratos, setContratos] = useState([]);

    useEffect(() => {
        const loadContratos = async () => {
            const data = await fetchContratos();
            setContratos(data);
            };
        loadContratos();
    }, []);

return (
    <div>
        <h1>Contratos de Locação</h1>
        <ContratosTable ContratoLocacao={contratos} />
    </div>
);
};

export default ContratosPage;
