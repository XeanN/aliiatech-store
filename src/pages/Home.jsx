import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      {/* HERO */}
      <section
        style={{
          padding: "80px 20px",
          textAlign: "center",
          background: "linear-gradient(135deg, #2563eb, #1e40af)",
          color: "#fff",
          borderRadius: "16px",
        }}
      >
        <h1>AliiaTech Store</h1>
        <p style={{ fontSize: "18px", margin: "20px 0" }}>
          Compra productos de calidad de forma rápida y segura.
        </p>

        <Link to="/tienda">
          <button className="secondary">Ver tienda</button>
        </Link>
      </section>

            {/* BENEFICIOS */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "60px",
        }}
      >
        <div>
          <h3>🚚 Envíos rápidos</h3>
          <p>Entrega segura a todo el país.</p>
        </div>

        <div>
          <h3>💳 Pago fácil</h3>
          <p>Compra por WhatsApp sin complicaciones.</p>
        </div>

        <div>
          <h3>🔒 Compra segura</h3>
          <p>Atención directa y personalizada.</p>
        </div>
      </section>

            {/* PRODUCTOS DESTACADOS */}
      <section style={{ marginBottom: "60px" }}>
        <h2>Productos destacados</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div style={{ border: "1px solid #eee", padding: "15px" }}>
            <h4>Zapatillas Urbanas</h4>
            <p>S/ 199</p>
            <Link to="/producto/zapatillas-urbanas">
              <button style={{ width: "100%" }}>Ver producto</button>
            </Link>
          </div>

          <div style={{ border: "1px solid #eee", padding: "15px" }}>
            <h4>Reloj Moderno</h4>
            <p>S/ 149</p>
            <Link to="/producto/reloj-moderno">
              <button style={{ width: "100%" }}>Ver producto</button>
            </Link>
          </div>
        </div>
      </section>

            {/* CÓMO COMPRAR */}
      <section style={{ marginBottom: "60px" }}>
        <h2>¿Cómo comprar?</h2>

        <ol style={{ marginTop: "15px" }}>
          <li>Explora nuestros productos</li>
          <li>Agrégalos al carrito</li>
          <li>Finaliza tu pedido por WhatsApp</li>
        </ol>
      </section>

            {/* CTA FINAL */}
      <section style={{ textAlign: "center", marginBottom: "60px" }}>
        <h2>¿Listo para comprar?</h2>
        <Link to="/tienda">
          <button style={{ padding: "14px 24px", fontSize: "16px" }}>
            Ir a la tienda
          </button>
        </Link>
      </section>
    </div>
  );
}




