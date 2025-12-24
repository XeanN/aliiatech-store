# 🛒 AliiaTech Store – Ecommerce Basic

Frontend ecommerce moderno desarrollado con **React + Vite**, enfocado en pequeñas y medianas empresas que desean vender productos de forma rápida, profesional y escalable, con **panel administrativo privado** y **frontend público optimizado**.

Este proyecto forma parte del ecosistema **AliiaTech**.

---

## 🚀 Tecnologías usadas

- ⚛️ React 18
- ⚡ Vite
- 🌐 React Router DOM
- 🛒 Context API (Carrito)
- 🎨 CSS personalizado (theme.css)
- 🔐 Rutas protegidas para Admin
- 📦 Deploy en GitHub Pages

---

## 📂 Arquitectura del proyecto

```txt
src/
│
├── components/          # Componentes reutilizables
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── AdminRoute.jsx
│   └── ...
│
├── context/             # Contextos globales
│   ├── CartContext.jsx
│   └── AuthContext.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   │
│   └── admin/           # Área privada (Admin)
│       ├── Login.jsx
│       ├── Dashboard.jsx
│       ├── Products.jsx
│       ├── Orders.jsx
│       └── Settings.jsx
│
├── styles/
│   └── theme.css
│
├── App.jsx
├── main.jsx
└── index.css
