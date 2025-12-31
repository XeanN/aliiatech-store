import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { theme } = useTheme();

  return (
    <div
      className="product-card"
      style={{
        "--primary": theme.primary,
        "--radius": theme.radius,
        "--font": theme.fontBody,
      }}
    >
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
      </div>

      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>

        <p className="product-price">
          S/ {product.price}
        </p>

        <Link
          to={`/producto/${product.slug}`}
          className="product-btn"
        >
          Ver producto
        </Link>
      </div>
    </div>
  );
}
