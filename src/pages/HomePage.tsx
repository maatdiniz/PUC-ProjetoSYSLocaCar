import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Bem-vindo à HomePage</h1>
            <p>Navegue pelas outras páginas usando o menu ou os links disponíveis.</p>
            <nav>
                <Link to="/contratos" style={{ marginRight: "15px", textDecoration: "none", color: "blue" }}>
                    Contratos
                </Link>
                <Link to="/veiculos" style={{ textDecoration: "none", color: "blue" }}>
                    Veículos
                </Link>
            </nav>
        </div>
    );
};

export default HomePage;
