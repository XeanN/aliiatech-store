  import { useParams } from "react-router-dom";
  import { useProducts } from "../../context/ProductsContext";
  import { useTheme } from "../../theme/ThemeContext";
  import { useCart } from "../../context/CartContext"; // Si usas carrito
  import { useState } from "react";
  import Button from "../../components/Button";

  export default function ProductDetail() {
    const { slug } = useParams();
    const { products } = useProducts();
    const { theme } = useTheme();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    // 1. Buscar el producto por slug
    const product = products.find((p) => p.slug === slug);

    if (!product) return <div style={{ padding: "50px", textAlign: "center" }}>Producto no encontrado</div>;

    // 2. Lógica PRO: Calcular descuentos
    const hasDiscount = product.comparePrice && parseFloat(product.comparePrice) > parseFloat(product.price);
    const discountPercentage = hasDiscount 
      ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) 
      : 0;

    // 3. Lógica BASIC: Generar Link de WhatsApp
    const handleWhatsAppBuy = () => {
      const phone = "51999999999"; // Aquí iría el número del dueño de la tienda
      const message = `Hola, quiero comprar: *${product.name}* \nPrecio: S/ ${product.price} \nCantidad: ${quantity}`;
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    };

    // 4. Lógica Híbrida (Carrito o Directo)
    const handleAddToCart = () => {
      addToCart({ ...product, quantity });
      alert("✅ Agregado al carrito");
    };

    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px" }}>
        
        {/* COLUMNA IZQUIERDA: IMAGEN */}
        <div>
          <div style={{ position: "relative", borderRadius: theme.radius.md, overflow: "hidden", border: "1px solid #eee" }}>
            
            {/* Badge Flotante (Igual que en la tarjeta) */}
            {product.badge && (
              <span style={{
                position: "absolute", top: "20px", left: "20px",
                background: product.badge === "sale" ? "#EF4444" : "#3B82F6",
                color: "white", padding: "6px 12px", borderRadius: "6px",
                fontWeight: "bold", fontSize: "0.9rem"
              }}>
                {product.badge === "sale" ? "🔥 OFERTA" : product.badge === "new" ? "🆕 NUEVO" : "🏆 TOP"}
              </span>
            )}

            <img 
              src={product.image || "https://via.placeholder.com/600"} 
              alt={product.name} 
              style={{ width: "100%", height: "500px", objectFit: "cover" }} 
            />
          </div>
        </div>

        {/* COLUMNA DERECHA: INFO Y COMPRA */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          
          <h1 style={{ fontFamily: theme.font.heading, fontSize: "2.5rem", marginBottom: "10px", color: theme.colors.text }}>
            {product.name}
          </h1>

          {/* Precios */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
            {hasDiscount && (
              <span style={{ textDecoration: "line-through", color: "#9CA3AF", fontSize: "1.5rem" }}>
                S/ {product.comparePrice}
              </span>
            )}
            <span style={{ fontSize: "2rem", fontWeight: "bold", color: hasDiscount ? "#EF4444" : theme.colors.primary }}>
              S/ {product.price}
            </span>
            {hasDiscount && (
              <span style={{ background: "#FEF2F2", color: "#EF4444", padding: "4px 8px", borderRadius: "4px", fontWeight: "bold" }}>
                Ahorras {discountPercentage}%
              </span>
            )}
          </div>

          <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "30px" }}>
            Descripción breve del producto. Aquí iría el texto que describe las características increíbles de este artículo. Ideal para convencer al cliente.
          </p>

          {/* Selector de Cantidad */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Cantidad:</label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ padding: "10px 15px", border: "1px solid #ddd", background: "white", cursor: "pointer" }}>-</button>
              <span style={{ fontSize: "1.2rem", fontWeight: "bold", width: "30px", textAlign: "center" }}>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} style={{ padding: "10px 15px", border: "1px solid #ddd", background: "white", cursor: "pointer" }}>+</button>
            </div>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
            
            {/* Botón Principal: Carrito */}
            <Button onClick={handleAddToCart} style={{ width: "100%", padding: "15px", fontSize: "1.1rem" }}>
              🛒 Agregar al Carrito
            </Button>

            {/* Botón Secundario: WhatsApp (Ideal para Template BASIC) */}
            <button 
              onClick={handleWhatsAppBuy}
              style={{ 
                width: "100%", padding: "15px", fontSize: "1.1rem", 
                background: "#25D366", color: "white", border: "none", 
                borderRadius: "8px", fontWeight: "bold", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.001.572 2.136.882 3.34.882l.004-.001c3.181 0 5.768-2.586 5.768-5.766 0-3.18-2.587-5.767-5.766-5.767zm12 5.766c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-4.305-1.298c-.246-.124-1.455-.718-1.68-.801-.226-.082-.39-.124-.555.124-.164.247-.636.801-.78.966-.143.165-.286.186-.532.062-.247-.124-1.043-.385-1.987-1.228-.737-.658-1.235-1.47-1.379-1.718-.144-.248-.015-.382.109-.505.11-.11.247-.287.37-.432.124-.143.165-.247.248-.412.082-.165.042-.309-.021-.433-.062-.123-.555-1.338-.76-1.832-.2-.486-.404-.419-.556-.427-.144-.008-.309-.008-.474-.008-.164 0-.432.062-.658.309-.227.247-.866.845-.866 2.061 0 1.216.886 2.391 1.009 2.556.124.165 1.745 2.665 4.228 3.738 2.482 1.073 2.482.716 2.936.674.453-.041 1.455-.595 1.661-1.169.205-.574.205-1.066.144-1.169-.062-.103-.227-.165-.473-.289z"/></svg>
              Pedir por WhatsApp
            </button>
          </div>

        </div>
      </div>
    );
  }