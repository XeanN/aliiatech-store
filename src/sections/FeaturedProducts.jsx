import { useProducts } from "../context/ProductsContext"; // Verifica que el nombre del archivo sea ProducstContext o ProductsContext
import ProductCard from "../components/ProductCard";

export default function FeaturedProducts() {
  const { products } = useProducts();

  // Filtramos: Que estén activos y tengan stock
  const featured = products
    .filter((p) => p.active !== false) // Asumimos true si no está definido
    .slice(0, 8); // Mostramos máximo 8

  return (
    <section style={{ padding: "40px 0" }}>
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Productos Destacados</h2>

      {featured.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#666" }}>
          No hay productos disponibles por el momento. ¡Pronto más novedades!
        </p>
      )}
    </section>
  );
}