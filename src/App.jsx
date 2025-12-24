import { HashRouter, Routes, Route } from "react-router-dom";

// Public pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

// Admin
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";

// Layout
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <HashRouter>
      <Header />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/tienda" element={<Shop />} />
        <Route path="/producto/:slug" element={<ProductDetail />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* ADMIN */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
      </Routes>

      <Footer />
    </HashRouter>
  );
}

export default App;
