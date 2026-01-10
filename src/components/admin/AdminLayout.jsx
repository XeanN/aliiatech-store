import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "240px 1fr", // 240px para el sidebar, el resto para contenido
        minHeight: "100vh",
      }}
    >
      {/* 1. Aquí va el Sidebar real (Ya funciona) */}
      <Sidebar />

      {/* 2. Aquí va el contenido principal (El Dashboard) */}
      <main
        style={{
          padding: "32px",
          background: "#F9FAFB", // Gris muy suave profesional
          overflowY: "auto" // Para que si es muy largo, haga scroll
        }}
      >
        {children}
      </main>
    </div>
  );
}