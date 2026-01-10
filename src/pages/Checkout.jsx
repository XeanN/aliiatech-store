  import { useState } from "react";
  import { useCart } from "../context/CartContext";

  // NOTA: En un SaaS real, esto vendría de la configuración global de la tienda (ShopContext)
  // Por ahora, simulamos que esta tienda está en modo "BASIC" (WhatsApp)
  const SHOP_MODE = "BASIC"; 

  export default function Checkout() {
    const { cart, cartTotal, clearCart } = useCart();
    const [formData, setFormData] = useState({ name: "", phone: "", address: "" });

    if (cart.length === 0) return <div style={{ padding: "50px", textAlign: "center" }}><h2>Tu carrito está vacío 🛒</h2></div>;

    const handleSubmit = (e) => {
      e.preventDefault();

      if (SHOP_MODE === "BASIC") {
        // MODO WHATSAPP
        const phone = "51999999999"; // Número del dueño
        let msg = `Hola, quiero pedir:\n`;
        cart.forEach(i => msg += `• ${i.name} (x${i.quantity})\n`);
        msg += `\nTotal: S/ ${cartTotal}\n\nDatos:\n${formData.name}\n${formData.address}`;
        
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
        clearCart();
      } else {
        // MODO PRO (Pasarela)
        alert("Redirigiendo a pasarela de pagos... (Simulado)");
      }
    };

    return (
      <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px" }}>
        <h1>Finalizar Compra</h1>
        <div style={{ background: "#F3F4F6", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
          <p style={{ margin: 0 }}>Total a pagar: <strong>S/ {cartTotal}</strong></p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input required placeholder="Nombre Completo" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ccc" }} />
          <input required placeholder="Teléfono" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ccc" }} />
          <textarea required placeholder="Dirección de entrega" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ccc" }} />
          
          <button type="submit" style={{ padding: "15px", background: SHOP_MODE === "BASIC" ? "#25D366" : "#111", color: "white", border: "none", borderRadius: "6px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer" }}>
            {SHOP_MODE === "BASIC" ? "📲 Enviar Pedido por WhatsApp" : "💳 Pagar Ahora"}
          </button>
        </form>
      </div>
    );
  }