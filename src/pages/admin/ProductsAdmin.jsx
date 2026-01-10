import { useMemo, useState } from "react";
// ✅ CORRECCIÓN 1: Asegúrate de que el archivo en src/context/ se llame "ProductsContext.jsx"
import { useProducts } from "../../context/ProductsContext"; 
import ProductEditor from "./ProductEditor";
import PreviewPanel from "./PreviewPanel";
// ✅ CORRECCIÓN 2: Importamos el Layout para que aparezca el menú lateral
import AdminLayout from "../../components/admin/AdminLayout";

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
    // ✅ CORRECCIÓN 3: Envolvemos todo en AdminLayout
    <AdminLayout>
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr 420px", gap: 16, height: "calc(100vh - 100px)" }}>
        
        {/* Sidebar interna de productos */}
        <aside style={{ borderRight: "1px solid #eee", paddingRight: 12, overflowY: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h2 style={{ margin: 0 }}>Productos</h2>
            <button onClick={handleNew} style={{ cursor: "pointer", padding: "5px 10px" }}>+ Nuevo</button>
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
                  background: p.id === selectedId ? "#f0f0f0" : "#fff",
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
                    // Evitar error si borras el último
                    setSelectedId(products.find(p => p.id !== selected.id)?.id || null);
                  }
                }}
                style={{ width: "100%", padding: 10, background: "#fee2e2", color: "red", border: "none", borderRadius: "6px", cursor: "pointer" }}
              >
                Eliminar
              </button>
            </div>
          )}
        </aside>

        {/* Editor Central */}
        <section style={{ overflowY: "auto" }}>
          {selected ? (
            <ProductEditor product={selected} onUpdate={(patch) => update(selected.id, patch)} />
          ) : (
            <p style={{ textAlign: "center", marginTop: 20 }}>Selecciona un producto.</p>
          )}
        </section>

        {/* Preview Panel (Derecha) */}
        <section style={{ overflowY: "auto" }}>
          {selected ? <PreviewPanel product={selected} /> : null}
        </section>
      </div>
    </AdminLayout>
  );
}