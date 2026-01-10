  import { useState } from "react";
  import { useProducts } from "../../context/ProducstContext";
  import { useAuth } from "../../context/AuthContext"; // Importamos el Auth para saber el plan

  export default function ProductForm() {
    const { addProduct } = useProducts();
    const { isPro } = useAuth(); // ¿Es cliente PRO?

    const [form, setForm] = useState({
      name: "",
      price: "",
      comparePrice: "", // Nuevo campo
      image: "",
      slug: "",
      badge: "" // Nuevo campo
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // Validaciones básicas
      if (!form.name || !form.price) return alert("Nombre y Precio son obligatorios");
      
      addProduct({
        ...form,
        id: Date.now(), // ID temporal simple
        // Si no es pro, forzamos que no tenga badge ni precio oferta
        badge: isPro ? form.badge : "",
        comparePrice: isPro ? form.comparePrice : ""
      });
      
      alert("Producto guardado con éxito");
      setForm({ name: "", price: "", comparePrice: "", image: "", slug: "", badge: "" });
    };

    const inputStyle = {
      width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ddd"
    };

    return (
      <form onSubmit={handleSubmit} style={{ background: "white", padding: "20px", borderRadius: "8px", maxWidth: "500px" }}>
        <h3 style={{ marginBottom: "15px" }}>Agregar Nuevo Producto</h3>
        
        {/* CAMPOS BÁSICOS (Para todos) */}
        <div>
          <label>Nombre del Producto</label>
          <input style={inputStyle} placeholder="Ej: Zapatillas Nike" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
              <label>Precio (S/)</label>
              <input type="number" style={inputStyle} placeholder="100.00" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} />
          </div>
          <div style={{ flex: 1 }}>
              <label>Slug (URL)</label>
              <input style={inputStyle} placeholder="zapatillas-nike" value={form.slug} onChange={e=>setForm({...form,slug:e.target.value})} />
          </div>
        </div>

        <div>
          <label>URL de Imagen</label>
          <input style={inputStyle} placeholder="https://..." value={form.image} onChange={e=>setForm({...form,image:e.target.value})} />
        </div>

        {/* 🚀 ZONA PRO (Condicional) */}
        {isPro ? (
          <div style={{ background: "#EFF6FF", padding: "15px", borderRadius: "8px", border: "1px solid #BFDBFE", marginTop: "10px" }}>
              <h4 style={{ color: "#1E40AF", marginTop: 0, fontSize: "0.9rem" }}>⚡ Opciones PRO Activadas</h4>
              
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <div style={{ flex: 1 }}>
                      <label style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#1e3a8a" }}>Precio Anterior (Oferta)</label>
                      <input 
                          type="number" 
                          style={{...inputStyle, marginBottom: 0}} 
                          placeholder="Ej: 150.00" 
                          value={form.comparePrice} 
                          onChange={e=>setForm({...form,comparePrice:e.target.value})} 
                      />
                  </div>
                  <div style={{ flex: 1 }}>
                      <label style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#1e3a8a" }}>Etiqueta (Badge)</label>
                      <select 
                          style={{...inputStyle, marginBottom: 0}} 
                          value={form.badge} 
                          onChange={e=>setForm({...form,badge:e.target.value})}
                      >
                          <option value="">Ninguna</option>
                          <option value="new">🆕 Nuevo</option>
                          <option value="sale">🔥 Oferta</option>
                          <option value="hot">🏆 Top Ventas</option>
                      </select>
                  </div>
              </div>
          </div>
        ) : (
          /* 🔒 BLOQUEO PARA BÁSICOS */
          <div style={{ background: "#F9FAFB", padding: "15px", borderRadius: "8px", border: "1px dashed #D1D5DB", marginTop: "15px", textAlign: "center", opacity: 0.8 }}>
              <p style={{ margin: "0 0 5px 0", fontSize: "0.9rem", color: "#4B5563" }}>🔒 <strong>Funciones Avanzadas Bloqueadas</strong></p>
              <p style={{ fontSize: "0.8rem", color: "#6B7280", margin: 0 }}>Actualiza a PRO para poner ofertas y etiquetas.</p>
          </div>
        )}

        <button type="submit" style={{ width: "100%", padding: "12px", background: "#111", color: "white", border: "none", borderRadius: "6px", fontWeight: "bold", marginTop: "20px", cursor: "pointer" }}>
          Guardar Producto
        </button>
      </form>
    );
  }