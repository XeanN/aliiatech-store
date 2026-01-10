import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./theme/ThemeContext";
import { ProductsProvider } from "./context/ProductsContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <ThemeProvider>
      <ProductsProvider>
        <CartProvider>
        <App />
      </CartProvider>
      </ProductsProvider>
    </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
