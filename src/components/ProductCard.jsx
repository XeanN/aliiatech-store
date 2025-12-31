import { Link } from "react-router-dom";
import { useTheme } from "../theme/ThemeContext";
import Button from "./Button";

export default function ProductCard({ product }) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        borderRadius: theme.radius.md,
        boxShadow: theme.shadow.card,
        background: theme.colors.background,
        padding: theme.spacing.md,
        transition: "0.3s",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          borderRadius: theme.radius.sm,
          marginBottom: theme.spacing.sm,
        }}
      />

      <h3
        style={{
          fontFamily: theme.font.heading,
          color: theme.colors.text,
        }}
      >
        {product.name}
      </h3>

      <p
        style={{
          color: theme.colors.muted,
          marginBottom: theme.spacing.sm,
        }}
      >
        S/ {product.price}
      </p>

      <Link to={`/producto/${product.slug}`}>
        <Button>Ver producto</Button>
      </Link>
    </div>
  );
}
