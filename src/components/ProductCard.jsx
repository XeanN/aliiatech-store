import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: "10px",
        padding: "15px",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      <h3>{product.name}</h3>
      <strong>S/ {product.price}</strong>

      <Link to={`/producto/${product.slug}`}>
        <button style={{ width: "100%" }}>
          Ver producto
        </button>
      </Link>
    </div>

  );
}
