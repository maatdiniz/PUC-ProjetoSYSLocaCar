import React from "react";
import AppRoutes from "./routes/routes";

const App: React.FC = () => {
    return (
        <div className="app">
            <AppRoutes />
        </div>
    );
};
console.log("O App está rodando");

export default App;

