import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { logout, user, isPro } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  // Estilos del link
  const linkStyle = (path) => ({
    display: "block",
    padding: "12px 24px",
    color: location.pathname === path ? "#2563EB" : "#4B5563",
    background: location.pathname === path ? "#EFF6FF" : "transparent",
    textDecoration: "none",
    fontWeight: location.pathname === path ? "bold" : "normal",
    marginBottom: "4px",
    borderRadius: "0 6px 6px 0",
    borderLeft: location.pathname === path ? "4px solid #2563EB" : "4px solid transparent"
  });

  return (
    <aside style={{ width: "240px", background: "white", borderRight: "1px solid #E5E7EB", height: "100vh", position: "sticky", top: 0, display: "flex", flexDirection: "column" }}>
      
      {/* HEADER */}
      <div style={{ padding: "24px", borderBottom: "1px solid #E5E7EB" }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#111827", margin: 0 }}>AliiaTech</h2>
        <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
           <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#E5E7EB", overflow: "hidden" }}>
             <img src={user?.avatar || "https://via.placeholder.com/32"} alt="User" style={{ width: "100%" }} />
           </div>
           <div>
             <p style={{ fontSize: "0.85rem", fontWeight: "600", margin: 0, color: "#374151" }}>{user?.name || "Admin"}</p>
             <span style={{ fontSize: "0.7rem", color: isPro ? "#2563EB" : "#059669", background: isPro ? "#EFF6FF" : "#ECFDF5", padding: "2px 6px", borderRadius: "4px" }}>
               {isPro ? "PLAN PRO" : "PLAN BÁSICO"}
             </span>
           </div>
        </div>
      </div>

      {/* MENÚ */}
      <nav style={{ padding: "24px 0", flex: 1 }}>
        <Link to="/admin/dashboard" style={linkStyle("/admin/dashboard")}>📊 Dashboard</Link>
        <Link to="/admin/products" style={linkStyle("/admin/products")}>📦 Productos</Link>
        {/* Agrega más enlaces aquí si quieres */}
      </nav>

      {/* FOOTER - BOTONES DE ACCIÓN */}
      <div style={{ padding: "20px", borderTop: "1px solid #E5E7EB", marginTop: "auto" }}>
        
        {/* CORRECCIÓN: Apuntamos a /tienda para evitar el redirect del login */}
        <a 
          href="/#/demo-tienda" 
          target="_blank" 
          style={{
            display: "block",
            marginBottom: "15px",
            padding: "12px",
            background: "#1F2937", 
            color: "white", 
            textAlign: "center", 
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontWeight: "600",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
          }}
        >
          <span>👁️</span> Ver mi Tienda
        </a>

        <button 
          onClick={handleLogout}
          style={{ 
            width: "100%", padding: "10px", background: "#FEE2E2", color: "#DC2626", 
            border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600"
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}