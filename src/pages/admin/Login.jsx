import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Conectamos con el cerebro

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Usamos la función de login del contexto
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("1. Botón presionado"); // <--- Agrega esto
    console.log("Datos:", email, password); // <--- Agrega esto

    try {
        const success = login(email, password);
        console.log("2. Resultado del login:", success); // <--- Agrega esto

        if (success) {
            console.log("3. Redirigiendo..."); // <--- Agrega esto
            navigate("/admin/dashboard");
        } else {
            alert("Credenciales incorrectas (Revisa la consola)");
        }
    } catch (error) {
        console.error("ERROR FATAL:", error);
        alert("Error en el sistema de Login. Revisa la consola (F12).");
    }
  };

  return (
    <div style={{ 
      height: "100vh", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      background: "#f3f4f6" 
    }}>
      <form 
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center"
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#111" }}>Acceso Admin</h2>
        
        <div style={{ marginBottom: "15px", textAlign: "left" }}>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem", fontWeight: "600" }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #ddd", boxSizing: "border-box" }}
            placeholder="ej: pro@aliiatech.com"
          />
        </div>

        <div style={{ marginBottom: "25px", textAlign: "left" }}>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem", fontWeight: "600" }}>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #ddd", boxSizing: "border-box" }}
            placeholder="••••••"
          />
        </div>

        <button 
          type="submit" 
          style={{
            width: "100%",
            padding: "14px",
            background: "#2563EB", 
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "1rem"
          }}
        >
          Ingresar
        </button>

        {/* Ayuda visual para ti y tu socio */}
        <div style={{ marginTop: "20px", padding: "15px", background: "#eff6ff", borderRadius: "8px", fontSize: "0.85rem", color: "#1e40af", textAlign: "left" }}>
          <p style={{ margin: "0 0 5px 0", fontWeight: "bold" }}>🔑 Credenciales Demo:</p>
          <div style={{ marginBottom: "5px" }}>🔹 <b>Basic:</b> basico@aliiatech.com / 123</div>
          <div>🔶 <b>Pro:</b> pro@aliiatech.com / 123</div>
        </div>
      </form>
    </div>
  );
}