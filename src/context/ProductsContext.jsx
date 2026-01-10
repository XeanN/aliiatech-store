import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/config";
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  doc, 
  deleteDoc, 
  updateDoc,
  query, 
  where // Importamos herramientas para filtrar
} from "firebase/firestore";
import { useAuth } from "./AuthContext"; // 1. Importamos Auth para saber quién eres

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // 2. Obtenemos al usuario logueado

  useEffect(() => {
    const productsRef = collection(db, "products");
    
    // 3. EL FILTRO MÁGICO 🛡️
    // Si hay usuario logueado, traemos SOLO sus productos.
    // Si no hay nadie (tienda pública), por ahora traemos todos (luego lo filtraremos por URL)
    let q = productsRef;
    if (user?.email) {
       // "Trae productos donde el campo 'owner' sea igual a mi email"
       q = query(productsRef, where("owner", "==", user.email));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]); // Se ejecuta cada vez que cambia el usuario

  // CREAR
  const create = async (newProduct) => {
    try {
      const { id, ...productData } = newProduct;
      
      // 4. FIRMA DIGITAL ✍️
      // Agregamos el campo "owner" automáticamente
      await addDoc(collection(db, "products"), {
        ...productData,
        owner: user?.email || "anonimo", // Guardamos tu email en el producto
        createdAt: new Date()
      });
      
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar");
    }
  };

  // ACTUALIZAR
  const update = async (id, updatedFields) => {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, updatedFields);
    } catch (error) { console.error(error); }
  };

  // ELIMINAR
  const remove = async (id) => {
    try {
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);
    } catch (error) { console.error(error); }
  };

  return (
    <ProductsContext.Provider value={{ products, create, update, remove, loading }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);