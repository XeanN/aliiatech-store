import { useState, useEffect } from "react";
import Button from "../../components/Button";

export default function HomeSettings() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("homeConfig")) || {};
    setTitle(saved.title || "");
    setSubtitle(saved.subtitle || "");
  }, []);

  const saveHome = () => {
    localStorage.setItem(
      "homeConfig",
      JSON.stringify({ title, subtitle })
    );
    alert("Home actualizado");
  };

  return (
    <section>
      <h3>Home - Hero</h3>

      <input
        type="text"
        placeholder="Título principal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Subtítulo"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />

      <Button onClick={saveHome}>Guardar Home</Button>
    </section>
  );
}
