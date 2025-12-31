import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const defaultTheme = {
  primary: "#111111",
  secondary: "#f5f5f5",
  fontBody: "Inter, system-ui, sans-serif",
  radius: "14px",
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(defaultTheme);

  const updateTheme = (patch) => {
    setTheme((prev) => ({ ...prev, ...patch }));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 👇 ESTE ERA EL FALTANTE
export const useTheme = () => useContext(ThemeContext);
