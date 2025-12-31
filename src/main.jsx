import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./theme/ThemeContext";
import { ProductsProvider } from "./context/ProducstContext";
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <ProductsProvider>
        <CartProvider>
        <App />
      </CartProvider>
      </ProductsProvider>
    </ThemeProvider>
  </React.StrictMode>
);
