// Aca agregamos Productos destacados del home
import ProductCard from "../components/ProductCard";

const products = [
  {
    id: 1,
    name: "Zapatillas Urbanas",
    price: 199,
    slug: "zapatillas-urbanas",
    image: "https://oechsle.vteximg.com.br/arquivos/ids/23453800-1000-1000/2825045.jpg?v=639014078762430000",
  },
  {
    id: 2,
    name: "Reloj Moderno",
    price: 149,
    slug: "reloj-moderno",
    image: "https://relojeriaperu.com/cdn/shop/files/25888014_fpx.webp?v=1730133484&width=500",
  },
];

export default function FeaturedProducts() {
  return (
    <section>
      <h2>Productos destacados</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
