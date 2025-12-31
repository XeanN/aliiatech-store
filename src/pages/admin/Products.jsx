import { useProducts } from "../../context/ProducstContext";
import ProductForm from "../../components/admin/ProductForm";
import ProductTable from "../../components/admin/ProductTable";

export default function ProductsAdmin() {
  const { products } = useProducts();

  return (
    <>
      <h2>Productos</h2>
      <ProductForm />
      <ProductTable products={products} />
    </>
  );
}
