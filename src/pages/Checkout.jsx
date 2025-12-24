import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Checkout() {
  const { cart } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

const whatsappMessage = `
Hola, quiero realizar un pedido 🛒

📦 Productos:
${cart
  .map(
    (item) =>
      `- ${item.name} x${item.quantity} — S/ ${
        item.price * item.quantity
      }`
  )
  .join("\n")}

💰 Total: S/ ${total}

👤 Cliente:
Nombre: ${customer.name}
Teléfono: ${customer.phone}
Dirección: ${customer.address}
`;
const isFormValid = customer.name && customer.phone && customer.address;

  if (cart.length === 0) {
    return <h2>Tu carrito está vacío</h2>;
  }

  return (
    <div className="container">
      <h1>Checkout</h1>

      <h3>Datos del cliente</h3>

      <div style={{ display: "grid", gap: "10px", maxWidth: "400px" }}>
      <input
        type="text"
        name="name"
        placeholder="Nombre completo"
        value={customer.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="phone"
        placeholder="Teléfono"
        value={customer.phone}
        onChange={handleChange}
      />

      <input
        type="text"
        name="address"
        placeholder="Dirección"
        value={customer.address}
        onChange={handleChange}
      />
    </div>


      <h3>Resumen</h3>

      {cart.map((item) => (
        <p key={item.id}>
          {item.name} x{item.quantity} — S/{" "}
          {item.price * item.quantity}
        </p>
      ))}

      <h2>Total: S/ {total}</h2>

      <a
        href={
            isFormValid
            ? `https://wa.me/51969980152?text=${encodeURIComponent(
                whatsappMessage
                )}`
            : "#"
        }
        target="_blank"
        rel="noopener noreferrer"
        >
        <button
            disabled={!isFormValid}
            style={{
            padding: "14px",
            fontSize: "16px",
            marginTop: "20px",
            width: "100%",
            opacity: isFormValid ? 1 : 0.5,
            cursor: isFormValid ? "pointer" : "not-allowed",
            }}
        >
            Finalizar por WhatsApp
        </button>
      </a>

    </div>
  );
}
