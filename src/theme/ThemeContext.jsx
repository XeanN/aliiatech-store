import { createContext, useContext, useState, useEffect } from "react";
import { defaultTheme } from "./defaultTheme";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem("themeConfig"));
    if (savedTheme) {
      setTheme({ ...defaultTheme, ...savedTheme });
    }
  }, []);

  const updateTheme = (newTheme) => {
    const updated = { ...theme, ...newTheme };
    setTheme(updated);
    localStorage.setItem("themeConfig", JSON.stringify(updated));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
