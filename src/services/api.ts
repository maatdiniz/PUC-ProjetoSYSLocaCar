import axios from "axios";

// Configuração básica do Axios
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000", // URL base da API
    timeout: 5000, // Timeout de 5 segundos
    headers: {
        "Content-Type": "application/json", // Tipo de conteúdo padrão
    },
});

// Interceptores de requisição (opcional)
api.interceptors.request.use(
    (config) => {
      // Garante que os headers existem antes de acessá-los
        if (!config.headers) {
        config.headers = {};
        }

      // Adicionar token de autenticação, se necessário
        const token = localStorage.getItem("token");
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptores de resposta (opcional)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Exemplo de tratamento de erro global
        if (error.response?.status === 401) {
            alert("Sessão expirada. Faça login novamente.");
            localStorage.removeItem("token");
            window.location.href = "/login"; // Redireciona para a página de login
        }
        return Promise.reject(error);
    }
);

export default api;
