import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const cartContext = useCart();
  const cart = cartContext?.cart || [];

  return (
    <header
      style={{
        padding: "20px",
        background: "#111",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h2>AliiaTech Store</h2>

      <nav>
        <Link to="/" style={{ color: "#fff", marginRight: "15px" }}>
          Inicio
        </Link>
        <Link to="/tienda" style={{ color: "#fff", marginRight: "15px" }}>
          Tienda
        </Link>
        <Link to="/carrito" style={{ color: "#fff" }}>
          🛒 ({cart.length})
        </Link>
      </nav>
    </header>
  );
}
