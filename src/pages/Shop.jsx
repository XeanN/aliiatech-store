import ProductCard from "../components/ProductCard";

const products = [
  {
    id: 1,
    name: "Zapatillas Urbanas",
    price: 199,
    slug: "zapatillas-urbanas",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    name: "Reloj Moderno",
    price: 149,
    slug: "reloj-moderno",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 3,
    name: "Audífonos Bluetooth",
    price: 99,
    slug: "audifonos-bluetooth",
    image: "https://via.placeholder.com/300",
  },
];

export default function Shop() {
  return (
    <div className="container">
      <h1>Tienda</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
