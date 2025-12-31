import { useMemo, useState } from "react";
import { useProducts } from "../../context/ProducstContext";
import ProductEditor from "./ProductEditor";
import PreviewPanel from "./PreviewPanel";

export default function ProductsAdmin() {
  const { products, create, update, remove } = useProducts();
  const [selectedId, setSelectedId] = useState(products[0]?.id || null);

  const selected = useMemo(
    () => products.find((p) => p.id === selectedId) || null,
    [products, selectedId]
  );

  const handleNew = () => {
    const id = crypto.randomUUID();
    const base = {
      id,
      name: "Nuevo producto",
      slug: `producto-${id.slice(0, 6)}`,
      price: 0,
      compareAtPrice: 0,
      description: "",
      images: ["https://via.placeholder.com/800"],
      badge: "",
      stock: 0,
      active: true,
      whatsappEnabled: true,
    };
    create(base);
    setSelectedId(id);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "320px 1fr 420px", gap: 16, padding: 16 }}>
      {/* Sidebar */}
      <aside style={{ borderRight: "1px solid #eee", paddingRight: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>Productos</h2>
          <button onClick={handleNew}>+ Nuevo</button>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              style={{
                textAlign: "left",
                padding: 10,
                borderRadius: 10,
                border: p.id === selectedId ? "2px solid #333" : "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              <div style={{ fontWeight: 700 }}>{p.name}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>
                {p.active ? "Activo" : "Oculto"} · Stock {p.stock}
              </div>
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ marginTop: 16 }}>
            <button
              onClick={() => {
                if (confirm("¿Eliminar producto?")) {
                  remove(selected.id);
                  setSelectedId(products[1]?.id || null);
                }
              }}
              style={{ width: "100%", padding: 10 }}
            >
              Eliminar
            </button>
          </div>
        )}
      </aside>

      {/* Editor */}
      <section>
        {selected ? (
          <ProductEditor product={selected} onUpdate={(patch) => update(selected.id, patch)} />
        ) : (
          <p>No hay producto seleccionado.</p>
        )}
      </section>

      {/* Preview Live */}
      <section>
        {selected ? <PreviewPanel product={selected} /> : null}
      </section>
    </div>
  );
}
