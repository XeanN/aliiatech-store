import { Link } from "react-router-dom";
// Asegúrate que esta ruta sea correcta según donde tengas tu contexto
import { useTheme } from "../context/ThemeContext"; 

export default function ProductCard({ product }) {
  const context = useTheme();
  
  // 🛡️ PROTECCIÓN ANTI-CRASH:
  // Si context es undefined (estamos en admin), usamos valores por defecto para que NO explote.
  const theme = context?.theme || {
    colors: { background: "#fff", text: "#000", primary: "#111", muted: "#999" },
    radius: { md: "8px", sm: "4px" },
    shadow: { card: "0 2px 4px rgba(0,0,0,0.1)" },
    font: { heading: "sans-serif" },
    spacing: { md: "16px", sm: "8px" }
  };

  // 1. LÓGICA DE PRECIOS
  // Usamos parseFloat para asegurar que sean números y evitar errores de cálculo
  const oldPrice = parseFloat(product.compareAtPrice || product.comparePrice || 0);
  const currentPrice = parseFloat(product.price);
  const hasDiscount = oldPrice > currentPrice;
  const discountPercentage = hasDiscount 
    ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100) 
    : 0;

  // 2. BADGES
  const badges = {
    new: { bg: "#3B82F6", label: "NUEVO" },
    sale: { bg: "#EF4444", label: "OFERTA" },
    top: { bg: "#F59E0B", label: "TOP 🔥" },
    oferta: { bg: "#EF4444", label: "OFERTA" }
  };
  const badgeKey = product.badge ? product.badge.toLowerCase() : null;
  const currentBadge = badges[badgeKey];

  return (
    <div
      style={{
        borderRadius: theme.radius.md,
        boxShadow: theme.shadow.card,
        background: theme.colors.background,
        border: "1px solid #E5E7EB",
        overflow: "hidden",
        position: "relative",
        display: "flex", 
        flexDirection: "column",
        height: "100%",
        transition: "transform 0.2s"
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
    >
      {/* BADGE */}
      {currentBadge && (
        <span style={{
          position: "absolute", top: "10px", left: "10px",
          background: currentBadge.bg, color: "white",
          fontSize: "0.7rem", fontWeight: "bold",
          padding: "4px 8px", borderRadius: "4px", zIndex: 10
        }}>
          {currentBadge.label}
        </span>
      )}

      {/* IMAGEN */}
      <div style={{ height: "220px", overflow: "hidden", background: "#f9fafb", padding: "10px" }}>
        <img
          src={product.image || (product.images && product.images[0]) || "https://via.placeholder.com/300"}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      {/* INFO */}
      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ 
          fontFamily: theme.font.heading,
          fontSize: "1rem", fontWeight: "bold", margin: "0 0 8px 0", color: theme.colors.text,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden"
        }}>
          {product.name}
        </h3>

        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          {hasDiscount && (
            <span style={{ textDecoration: "line-through", color: theme.colors.muted, fontSize: "0.9rem" }}>
              S/ {oldPrice}
            </span>
          )}
          <span style={{ color: hasDiscount ? "#DC2626" : theme.colors.primary, fontWeight: "bold", fontSize: "1.2rem" }}>
            S/ {currentPrice}
          </span>
        </div>

        {/* Solo mostramos botón si NO estamos en modo preview (opcional) */}
        <Link to={`/producto/${product.slug}`} style={{ marginTop: "12px", textDecoration: "none" }}>
          <button style={{ 
            width: "100%", padding: "10px", background: "#111", color: "white", 
            border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" 
          }}>
            Ver Detalles
          </button>
        </Link>
      </div>
    </div>
  );
}