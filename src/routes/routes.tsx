import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ContratosPage from "../pages/ContratosPage";
import VeiculosPage from "../pages/ContratosPage";

const AppRoutes: React.FC = () => {
return (
    <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contratos" element={<ContratosPage />} />
            <Route path="/veiculos" element={<VeiculosPage />} />
        </Routes>
    </Router>
);
};

export default AppRoutes;

