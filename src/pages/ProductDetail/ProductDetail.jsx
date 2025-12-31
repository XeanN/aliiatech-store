import { useParams } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import ProductGallery from "./ProductGallery";
import ProductUpsell from "./ProductUpsell";
import "./ProductDetail.css";

// 🔹 luego esto vendrá del backend / admin
const PRODUCTS = [
  {
    id: 1,
    name: "Zapatillas Urbanas",
    slug: "zapatillas-urbanas",
    price: 199,
    description:
      "Zapatillas cómodas, modernas y resistentes para uso diario.",
    images: [
      "https://via.placeholder.com/600",
      "https://via.placeholder.com/600/111",
      "https://via.placeholder.com/600/333",
    ],
  },
];

export default function ProductDetail() {
  const { slug } = useParams();
  const { theme } = useTheme();

  const product = PRODUCTS.find(p => p.slug === slug);

  if (!product) return <h2>Producto no encontrado</h2>;

  const whatsappMessage = encodeURIComponent(
    `Hola, quiero comprar el producto:\n\n${product.name}\nPrecio: S/ ${product.price}`
  );

  return (
    <div
      className="product-detail"
      style={{
        "--primary": theme.primary,
        "--font": theme.fontBody,
      }}
    >
      <ProductGallery images={product.images} />

      <div className="product-info">
        <h1>{product.name}</h1>

        <p className="price">S/ {product.price}</p>

        <p className="description">{product.description}</p>

        <a
          className="cta"
          href={`https://wa.me/51969980152?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Comprar por WhatsApp
        </a>
      </div>

      <ProductUpsell />
    </div>
  );
}
