import ProductCard from "../../components/ProductCard/ProductCard";

export default function PreviewPanel({ product }) {
  const showOffer = product.compareAtPrice > product.price && product.price > 0;

  return (
    <div style={{ borderLeft: "1px solid #eee", paddingLeft: 12 }}>
      <h3 style={{ marginTop: 0 }}>Preview en vivo</h3>

      <div style={{ marginBottom: 14 }}>
        <ProductCard product={product} />
      </div>

      <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 12 }}>
        <div style={{ fontWeight: 800, fontSize: 18 }}>{product.name}</div>

        <div style={{ marginTop: 8, display: "flex", gap: 10, alignItems: "baseline" }}>
          <span style={{ fontSize: 20, fontWeight: 900 }}>S/ {product.price}</span>
          {showOffer && (
            <span style={{ textDecoration: "line-through", opacity: 0.6 }}>
              S/ {product.compareAtPrice}
            </span>
          )}
        </div>

        <div style={{ marginTop: 10, opacity: 0.8 }}>
          Stock: {product.stock} · {product.active ? "Visible" : "Oculto"} · WhatsApp:{" "}
          {product.whatsappEnabled ? "ON" : "OFF"}
        </div>

        <button
          disabled={!product.whatsappEnabled}
          style={{
            width: "100%",
            marginTop: 14,
            padding: 12,
            borderRadius: 10,
            opacity: product.whatsappEnabled ? 1 : 0.5,
            cursor: product.whatsappEnabled ? "pointer" : "not-allowed",
          }}
        >
          CTA WhatsApp (preview)
        </button>
      </div>
    </div>
  );
}
