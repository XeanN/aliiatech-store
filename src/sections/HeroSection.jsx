import { useEffect, useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const { theme } = useTheme();
  const [config, setConfig] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("homeConfig")) || {};
    setConfig(saved);
  }, []);

  return (
    <section
      style={{
        padding: "80px 20px",
        textAlign: "center",
        background: theme.colors.primary,
        color: "#fff",
      }}
    >
      <h1>{config.title || "Bienvenido a Aliiatech Store"}</h1>
      <p>{config.subtitle || "Compra fácil y rápido"}</p>

      <Link to="/tienda">
        <Button>Ver tienda</Button>
      </Link>
    </section>
  );
}
