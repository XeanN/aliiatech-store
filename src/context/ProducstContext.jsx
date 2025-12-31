import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ProductsContext = createContext();

const STORAGE_KEY = "aliia_products_v1";

const seed = [
  {
    id: "p1",
    name: "Zapatillas Urbanas",
    slug: "zapatillas-urbanas",
    price: 199,
    compareAtPrice: 249, // precio antes (oferta)
    description: "Zapatillas cómodas, modernas y resistentes.",
    images: [
      "https://via.placeholder.com/800",
      "https://via.placeholder.com/800/111",
      "https://via.placeholder.com/800/333",
    ],
    badge: "Oferta", // "", "Nuevo", "Top", "Oferta"
    stock: 12,
    active: true,
    whatsappEnabled: true,
  },
];

function loadProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : seed;
  } catch {
    return seed;
  }
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(loadProducts);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const api = useMemo(
    () => ({
      products,
      getById: (id) => products.find((p) => p.id === id),
      getBySlug: (slug) => products.find((p) => p.slug === slug),

      create: (product) => {
        setProducts((prev) => [{ ...product }, ...prev]);
      },

      update: (id, patch) => {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, ...patch } : p))
        );
      },

      remove: (id) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      },
    }),
    [products]
  );

  return (
    <ProductsContext.Provider value={api}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);
