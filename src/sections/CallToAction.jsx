import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function CallToAction() {
  return (
    <section style={{ textAlign: "center", margin: "60px 0" }}>
      <h2>¿Listo para comprar?</h2>
      <Link to="/tienda">
        <Button>Ir a la tienda</Button>
      </Link>
    </section>
  );
}
