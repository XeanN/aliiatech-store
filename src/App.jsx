import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

// Public pages (La tienda visual)
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

// Admin (La parte SaaS)
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProductsAdmin from "./pages/admin/ProductsAdmin";

// Layout y Seguridad
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <HashRouter>
      {/* NOTA: En un SaaS real, el Header/Footer de la tienda no deberían verse en el Login.
          Pero por ahora lo dejaremos para no romper tu diseño visual. */}
      {/* <Header />  <-- Podrías querer quitar esto si el login debe ser limpio */}

      <Routes>
        {/* ------------------------------------------------------- */}
        {/* 🚨 EL CAMBIO CLAVE ESTÁ AQUÍ: */}
        {/* Antes: Mostraba <Home /> */}
        {/* Ahora: Redirige automáticamente al Login */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
        {/* ------------------------------------------------------- */}

        {/* He movido la "Landing" vieja a una ruta por si quieres verla luego */}
        <Route path="/demo-tienda" element={<Home />} />

        {/* Rutas de la Tienda (Accesibles si el cliente quiere ver cómo queda) */}
        <Route path="/tienda" element={<Shop />} />
        <Route path="/producto/:slug" element={<ProductDetail />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* ------------------------------------------------------- */}
        {/* ZONA ADMIN (SAAS) */}
        {/* ------------------------------------------------------- */}
        <Route path="/admin/login" element={<Login />} />
        
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <ProductsAdmin />
            </AdminRoute>
          }
        />
      </Routes>

      {/* <Footer /> <-- Igual que el Header, quizás quieras ocultarlo en el admin */}
    </HashRouter>
  );
}

export default App;