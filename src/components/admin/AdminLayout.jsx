import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <main
        style={{
          padding: "32px",
          background: "#F9FAFB",
        }}
      >
        {children}
      </main>
    </div>
  );
}
