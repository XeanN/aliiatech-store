import { useState } from "react";
import { useProducts } from "../../context/ProducstContext";

export default function ProductForm() {
  const { addProduct } = useProducts();
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    slug: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(form);
    setForm({ name: "", price: "", image: "", slug: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Nombre" onChange={e=>setForm({...form,name:e.target.value})} />
      <input placeholder="Precio" onChange={e=>setForm({...form,price:e.target.value})} />
      <input placeholder="Imagen URL" onChange={e=>setForm({...form,image:e.target.value})} />
      <input placeholder="Slug" onChange={e=>setForm({...form,slug:e.target.value})} />
      <button>Guardar</button>
    </form>
  );
}
