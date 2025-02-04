import axios from "axios";

// Erstelle eine Axios-Instanz mit Basis-URL und Standardheader
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // passe die URL an, falls nötig
  headers: {
    "Content-Type": "application/json",
  },
});

// Fügt einen Request-Interceptor hinzu, der den Token aus dem Local Storage anhängt
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api; 