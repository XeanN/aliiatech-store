import { useState, useEffect } from "react";
import { useProducts } from "../../context/ProductsContext";
import { useAuth } from "../../context/AuthContext"; // 👈 Importar Auth
import { useNavigate, useParams } from "react-router-dom";

export default function ProductEditor() {
  const { id } = useParams();
  const { create, update, getById } = useProducts();
  const { isPro } = useAuth(); // 👈 ¿Es Pro o no?
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    compareAtPrice: "", // Solo Pro
    description: "",
    badge: "", // Solo Pro
    stock: 0,
    sku: "", // Solo Pro
    active: true
  });

  // (Mantenemos tu lógica de carga de datos existente...)
  // ... useEffect para cargar datos si hay ID ...

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) update(id, form);
    else create({ ...form, id: Date.now() }); // ID temporal
    navigate("/admin/products");
  };

  return (
    <div style={{ padding: "20px", background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <h2>{id ? "Editar Producto" : "Nuevo Producto"}</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        {/* CAMPOS BÁSICOS (PARA TODOS) */}
        <div>
          <label>Nombre del Producto</label>
          <input name="name" value={form.name} onChange={handleChange} required style={{ display: "block", width: "100%", padding: "8px" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <label>Precio (S/)</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} required style={{ display: "block", width: "100%", padding: "8px" }} />
          </div>
          
          {/* 🔒 CAMPO EXCLUSIVO PRO: PRECIO DE OFERTA */}
          {isPro && (
            <div>
              <label>Precio Antes (Oferta) <span style={{color: "#d97706", fontSize: "0.8rem"}}>PRO</span></label>
              <input type="number" name="compareAtPrice" value={form.compareAtPrice} onChange={handleChange} style={{ display: "block", width: "100%", padding: "8px", border: "1px solid #fbbf24" }} />
            </div>
          )}
        </div>

        {/* 🔒 CAMPO EXCLUSIVO PRO: BADGES */}
        {isPro && (
          <div style={{ padding: "15px", background: "#fffbeb", border: "1px dashed #d97706", borderRadius: "6px" }}>
            <label style={{ fontWeight: "bold", color: "#92400e" }}>Marketing & Badges (PRO)</label>
            <select name="badge" value={form.badge} onChange={handleChange} style={{ display: "block", width: "100%", marginTop: "5px", padding: "8px" }}>
              <option value="">-- Sin etiqueta --</option>
              <option value="Nuevo">Nuevo</option>
              <option value="Oferta">Oferta</option>
              <option value="Top Ventas">Top Ventas</option>
              <option value="Ultimas Unidades">Últimas Unidades</option>
            </select>
          </div>
        )}

        <div>
          <label>Descripción</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows="4" style={{ display: "block", width: "100%", padding: "8px" }} />
        </div>

        <div>
          <label>Stock</label>
          <input type="number" name="stock" value={form.stock} onChange={handleChange} style={{ display: "block", width: "100%", padding: "8px" }} />
        </div>

        <button type="submit" style={{ padding: "12px", background: "#10b981", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
          Guardar Producto
        </button>
      </form>
    </div>
  );
}