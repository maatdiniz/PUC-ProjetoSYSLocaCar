import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ContratosTable from "../components/ContratosTable";
import { fetchContratos, Contrato } from "../services/contratosService";


const ContratosPage: React.FC = () => {
    const [contratos, setContratos] = useState<Contrato[]>([]);

    useEffect(() => {
        const loadContratos = async () => {
            try {
                const data = await fetchContratos();
                setContratos(data); // Agora o tipo é compatível
            } catch (error) {
                console.error("Erro ao carregar contratos:", error);
            }
        };
    
        loadContratos();
    }, []);

return (
    <div>
        <h1>Contratos de Locação</h1>
        <ContratosTable contratos={contratos} />
    </div>
);
};  

export default ContratosPage;
