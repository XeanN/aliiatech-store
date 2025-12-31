import { useTheme } from "../../theme/ThemeContext";
import { useState } from "react";
import Button from "../../components/Button";

export default function ThemeSettings() {
  const { theme, updateTheme } = useTheme();

  const [colors, setColors] = useState(theme.colors);
  const [font, setFont] = useState(theme.font);

  const saveTheme = () => {
    updateTheme({ colors, font });
    alert("Theme actualizado");
  };

  return (
    <section style={{ marginTop: "40px" }}>
      <h3>Theme / Estilos</h3>

      <h4>Colores</h4>

      <label>Color Primario</label>
      <input
        type="color"
        value={colors.primary}
        onChange={(e) =>
          setColors({ ...colors, primary: e.target.value })
        }
      />

      <label>Color Secundario</label>
      <input
        type="color"
        value={colors.secondary}
        onChange={(e) =>
          setColors({ ...colors, secondary: e.target.value })
        }
      />

      <label>Color Texto</label>
      <input
        type="color"
        value={colors.text}
        onChange={(e) =>
          setColors({ ...colors, text: e.target.value })
        }
      />

      <h4>Tipografías</h4>

      <label>Fuente Títulos</label>
      <select
        value={font.heading}
        onChange={(e) =>
          setFont({ ...font, heading: e.target.value })
        }
      >
        <option value="'Poppins', sans-serif">Poppins</option>
        <option value="'Inter', sans-serif">Inter</option>
        <option value="'Roboto', sans-serif">Roboto</option>
      </select>

      <label>Fuente Texto</label>
      <select
        value={font.body}
        onChange={(e) =>
          setFont({ ...font, body: e.target.value })
        }
      >
        <option value="'Inter', sans-serif">Inter</option>
        <option value="'Roboto', sans-serif">Roboto</option>
        <option value="'Open Sans', sans-serif">Open Sans</option>
      </select>

      <Button onClick={saveTheme}>Guardar Theme</Button>
    </section>
  );
}
