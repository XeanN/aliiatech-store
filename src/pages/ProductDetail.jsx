import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const products = [
  {
    id: 1,
    name: "Zapatillas Urbanas",
    price: 199,
    slug: "zapatillas-urbanas",
    image: "https://via.placeholder.com/600",
    description: "Zapatillas cómodas y modernas para uso diario.",
  },
  {
    id: 2,
    name: "Reloj Moderno",
    price: 149,
    slug: "reloj-moderno",
    image: "https://via.placeholder.com/600",
    description: "Reloj elegante ideal para cualquier ocasión.",
  },
];

export default function ProductDetail() {
  const { slug } = useParams();
  const { addToCart } = useCart(); // ✅ aquí

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return <h2>Producto no encontrado</h2>;
  }

  return (
    <div className="container">
      <h1>{product.name}</h1>

      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", maxWidth: "400px" }}
      />

      <p>{product.description}</p>
      <h2>S/ {product.price}</h2>

      <button
        onClick={() => addToCart(product)}
        style={{ padding: "10px 20px", marginRight: "10px" }}
      >
        Agregar al carrito
      </button>

      <a
        href={`https://wa.me/51969980152?text=Hola, quiero el producto ${product.name}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button style={{ padding: "10px 20px" }}>
          Comprar por WhatsApp
        </button>
      </a>
    </div>
  );
}
