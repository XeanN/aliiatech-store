import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../theme/ThemeContext";

export default function Header() {
  const { cart } = useCart();
  const { theme } = useTheme();

  return (
    <header
      style={{
        padding: theme.spacing.md,
        background: theme.colors.text,
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ fontFamily: theme.font.heading }}>
        AliiaTech Store
      </h2>

      <nav>
        <Link to="/" style={{ color: "#fff", marginRight: 15 }}>
          Inicio
        </Link>
        <Link to="/tienda" style={{ color: "#fff", marginRight: 15 }}>
          Tienda
        </Link>
        <Link to="/carrito" style={{ color: "#fff" }}>
          🛒 ({cart.length})
        </Link>
      </nav>
    </header>
  );
}
