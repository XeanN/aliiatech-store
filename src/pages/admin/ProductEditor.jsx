export default function ProductEditor({ product, onUpdate }) {
  const set = (key) => (e) => {
    const val =
      e.target.type === "checkbox"
        ? e.target.checked
        : e.target.type === "number"
        ? Number(e.target.value)
        : e.target.value;

    onUpdate({ [key]: val });
  };

  const setImage = (idx) => (e) => {
    const next = [...product.images];
    next[idx] = e.target.value;
    onUpdate({ images: next });
  };

  const addImage = () => onUpdate({ images: [...product.images, "https://via.placeholder.com/800"] });
  const removeImage = (idx) => onUpdate({ images: product.images.filter((_, i) => i !== idx) });

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h2 style={{ margin: 0 }}>Editor</h2>

      <label>
        Nombre
        <input value={product.name} onChange={set("name")} />
      </label>

      <label>
        Slug (URL)
        <input value={product.slug} onChange={set("slug")} />
      </label>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <label>
          Precio (S/)
          <input type="number" value={product.price} onChange={set("price")} />
        </label>

        <label>
          Precio antes (oferta)
          <input type="number" value={product.compareAtPrice} onChange={set("compareAtPrice")} />
        </label>
      </div>

      <label>
        Stock
        <input type="number" value={product.stock} onChange={set("stock")} />
      </label>

      <label>
        Badge
        <select value={product.badge} onChange={set("badge")}>
          <option value="">Ninguno</option>
          <option value="Nuevo">Nuevo</option>
          <option value="Top">Top</option>
          <option value="Oferta">Oferta</option>
        </select>
      </label>

      <label>
        Descripción
        <textarea rows={4} value={product.description} onChange={set("description")} />
      </label>

      <div style={{ display: "flex", gap: 12 }}>
        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input type="checkbox" checked={product.active} onChange={set("active")} />
          Producto activo (visible)
        </label>

        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input type="checkbox" checked={product.whatsappEnabled} onChange={set("whatsappEnabled")} />
          WhatsApp habilitado
        </label>
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0 }}>Imágenes</h3>
          <button onClick={addImage}>+ Añadir</button>
        </div>

        <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
          {product.images.map((img, idx) => (
            <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8 }}>
              <input value={img} onChange={setImage(idx)} />
              <button onClick={() => removeImage(idx)}>X</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
