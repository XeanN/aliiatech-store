import { useTheme } from "../theme/ThemeContext";

export default function Button({ children, onClick, variant = "primary" }) {
  const { theme } = useTheme();

  const styles = {
    padding: "12px 20px",
    borderRadius: theme.radius.sm,
    fontFamily: theme.font.body,
    fontWeight: 500,
    cursor: "pointer",
    border: "none",
    background:
      variant === "primary"
        ? theme.colors.primary
        : theme.colors.secondary,
    color:
      variant === "primary"
        ? "#fff"
        : theme.colors.text,
  };

  return (
    <button onClick={onClick} style={styles}>
      {children}
    </button>
  );
}
