import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ContratosTable from "../components/ContratosTable";
import { fetchContratos } from "../services/contratosService";


const ContratosPage: React.FC = () => {
    const [contratos, setContratos] = useState([]);

    useEffect(() => {
        const loadContratos = async () => {
            try {
                const data = await fetchContratos(); // Certifique-se de que fetchContratos está tipado
                setContratos(data); // Agora, data é do tipo Contrato[]
            } catch (error) {
                console.error("Erro ao carregar contratos:", error);
            }
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
