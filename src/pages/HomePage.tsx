import React from "react";

const HomePage: React.FC = () => {
    return (
    <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Bem-vindo à HomePage</h1>
        <p>
            Navegue pelas outras páginas usando o menu ou os links disponíveis.
        </p>
        <nav>
            <a href="/contratos" style={{ marginRight: "15px" }}>
                Contratos
            </a>
        <a href="/veiculos">Veículos</a>
        </nav>
    </div>
    );
};

export default HomePage;
