import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importamos el contexto nuevo

export default function AdminRoute({ children }) {
  const { user } = useAuth(); // Preguntamos al contexto si hay usuario
  
  // Si hay usuario (user existe), lo deja pasar (children).
  // Si no, lo manda al login.
  return user ? children : <Navigate to="/admin/login" />;
}