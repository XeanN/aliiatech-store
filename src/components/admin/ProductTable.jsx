import { useProducts } from "../../context/ProductsContext";

export default function ProductTable({ products }) {
  const { deleteProduct } = useProducts();

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>S/ {p.price}</td>
            <td>
              <button onClick={()=>deleteProduct(p.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
