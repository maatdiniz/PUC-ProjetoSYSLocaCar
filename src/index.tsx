import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/global.css"; // Caso haja estilos globais

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
