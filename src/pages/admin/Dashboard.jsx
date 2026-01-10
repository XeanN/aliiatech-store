    import { useSearchParams, Link } from "react-router-dom";
    import AdminLayout from "../../components/admin/AdminLayout";
    import GeneralSettings from "./GeneralSettings";
    import HomeSettings from "./HomeSettings";
    import ThemeSettings from "./ThemeSettings";
    import { useAuth } from "../../context/AuthContext"; // Importante para saber el plan

    export default function Dashboard() {
    const [params, setParams] = useSearchParams();
    const tab = params.get("tab") || "general";
    const { user, isPro } = useAuth(); // Obtenemos el plan del usuario

    // Función para cambiar pestaña
    const changeTab = (newTab) => setParams({ tab: newTab });

    // Renderizado condicional de pestañas
    const renderTab = () => {
        switch (tab) {
        case "home": return <HomeSettings />;
        case "theme": 
            // 🔒 BLOQUEO DE SEGURIDAD: Si no es Pro, no mostramos el editor de temas
            return isPro ? <ThemeSettings /> : <UpgradeMessage feature="Editor de Diseño" />;
        default: return <GeneralSettings />;
        }
    };

    const btnStyle = (active) => ({
        padding: "10px 20px", cursor: "pointer", border: "none", background: "none",
        borderBottom: active ? "3px solid #2563EB" : "3px solid transparent",
        color: active ? "#2563EB" : "#6B7280", fontWeight: active ? "bold" : "normal"
    });

    return (
        <AdminLayout>
        {/* CABECERA: Bienvenida y Estado del Plan */}
        <div style={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: "bold", margin: 0 }}>Hola, {user?.name} 👋</h1>
            <p style={{ color: "#6B7280", marginTop: "5px" }}>
                Plan actual: <span style={{ color: isPro ? "#2563EB" : "#059669", fontWeight: "bold" }}>
                {isPro ? "⚡ ECOMMERCE PRO" : "🌱 BÁSICO (WhatsApp)"}
                </span>
            </p>
            </div>
            
        </div>

        {/* 📊 ESTADÍSTICAS (Diferenciadas) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "30px" }}>
            <StatCard title="Productos" value="12" icon="📦" />
            
            {isPro ? (
            <>
                <StatCard title="Ventas del Mes" value="S/ 1,240" icon="💰" color="#2563EB" />
                <StatCard title="Visitas" value="3,400" icon="eye" color="#7C3AED" />
            </>
            ) : (
            <div style={{ background: "#F3F4F6", padding: "20px", borderRadius: "10px", border: "1px dashed #9CA3AF", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <span>🔒</span> 
                <span style={{ fontSize: "0.9rem", color: "#4B5563" }}>Estadísticas avanzadas (Solo PRO)</span>
            </div>
            )}
        </div>

        {/* NAVEGACIÓN DE PESTAÑAS */}
        <div style={{ background: "white", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <div style={{ borderBottom: "1px solid #eee", marginBottom: "20px", display: "flex", gap: "10px" }}>
            <button onClick={() => changeTab("general")} style={btnStyle(tab === "general")}>⚙️ General</button>
            <button onClick={() => changeTab("home")} style={btnStyle(tab === "home")}>🏠 Portada</button>
            {/* Mostramos la pestaña Diseño con un candado si es Basic */}
            <button onClick={() => changeTab("theme")} style={btnStyle(tab === "theme")}>
                🎨 Diseño {isPro ? "" : "🔒"}
            </button>
            </div>

            {renderTab()}
        </div>
        </AdminLayout>
    );
    }

    // Componentes auxiliares para limpiar el código
    function StatCard({ title, value, color = "#111" }) {
    return (
        <div style={{ background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
        <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "5px" }}>{title.toUpperCase()}</p>
        <p style={{ fontSize: "1.8rem", fontWeight: "bold", color: color, margin: 0 }}>{value}</p>
        </div>
    );
    }

    function UpgradeMessage({ feature }) {
    return (
        <div style={{ textAlign: "center", padding: "40px 20px", background: "#F9FAFB", borderRadius: "8px", border: "1px dashed #D1D5DB" }}>
        <h3 style={{ color: "#1F2937" }}>Función Bloqueada: {feature}</h3>
        <p style={{ color: "#6B7280", maxWidth: "400px", margin: "10px auto" }}>
            Esta herramienta es exclusiva para tiendas PRO. Actualiza tu plan para personalizar los colores y tipografías de tu marca.
        </p>
        <button style={{ background: "#111", color: "white", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
            🚀 Quiero ser PRO
        </button>
        </div>
    );
    }