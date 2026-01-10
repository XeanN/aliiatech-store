import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Para leer la URL
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config"; // Tu conexión a la nube
import ProductCard from "../components/ProductCard"; // Tu tarjeta bonita

export default function Shop() {
  const { vendedor } = useParams(); // 1. Capturamos el email de la URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsRef = collection(db, "products");
        let q;

        if (vendedor) {
          // 2. CASO TIENDA PRIVADA: Filtramos por el dueño
          console.log("🔍 Buscando productos de:", vendedor);
          q = query(productsRef, where("owner", "==", vendedor));
        } else {
          // 3. CASO GENERAL: (Opcional) Mostrar todo o nada
          // Por ahora mostramos todo si no hay dueño en la URL
          q = productsRef;
        }

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(data);
      } catch (error) {
        console.error("Error cargando tienda:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [vendedor]); // Se ejecuta cada vez que cambia la URL

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Cabecera de la Tienda */}
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
          {vendedor ? `Tienda de ${vendedor}` : "Mercado AliiaTech"}
        </h1>
        <p style={{ color: "#666" }}>
          {vendedor 
            ? "Bienvenido a mi espacio privado." 
            : "Explora todos los productos de nuestra comunidad."}
        </p>
      </header>

      {/* Grid de Productos */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Cargando catálogo...</p>
      ) : products.length > 0 ? (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
          gap: "20px" 
        }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "50px", background: "#f9f9f9", borderRadius: "10px" }}>
          <h3>🤷‍♂️ Esta tienda está vacía</h3>
          <p>El usuario {vendedor} aún no ha publicado productos.</p>
        </div>
      )}
    </div>
  );
}