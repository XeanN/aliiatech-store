import { useTheme } from "../theme/ThemeContext";

const benefits = [
  { icon: "🚚", title: "Envíos rápidos", desc: "Entrega segura a todo el país." },
  { icon: "💳", title: "Pago fácil", desc: "Compra por WhatsApp sin complicaciones." },
  { icon: "🔒", title: "Compra segura", desc: "Atención directa y personalizada." },
];

export default function BenefitsSection() {
  const { theme } = useTheme();

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: theme.spacing.md,
        marginBottom: theme.spacing.lg,
      }}
    >
      {benefits.map((b, i) => (
        <div key={i}>
          <h3>{b.icon} {b.title}</h3>
          <p style={{ color: theme.colors.muted }}>{b.desc}</p>
        </div>
      ))}
    </section>
  );
}
