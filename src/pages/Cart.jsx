import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return <h2>Tu carrito está vacío</h2>;
  }

  return (
    <div className="container">
      <h1>Carrito</h1>

      {cart.map((item) => (
        <div key={item.id} style={{ marginBottom: "15px" }}>
          <h3>{item.name}</h3>
          <p>Cantidad: {item.quantity}</p>
          <p>Precio: S/ {item.price}</p>

          <button onClick={() => removeFromCart(item.id)}>
            Quitar
          </button>
        </div>
      ))}
      <Link to="/checkout">
        <button style={{ padding: "12px 20px", marginTop: "20px" }}>
            Ir a Checkout
        </button>
      </Link> 
    </div>
    
  );
}
