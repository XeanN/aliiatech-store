import { useProducts } from "../context/ProducstContext";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const { products } = useProducts();

  return (
    <div
        style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "24px",
        }}
        >
        {products.map(p => (
            <ProductCard key={p.id} product={p} />
        ))}
    </div>

  );
}
