import { useState, useEffect } from "react";
import Button from "../../components/Button";

export default function GeneralSettings() {
  const [storeName, setStoreName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("storeConfig")) || {};
    setStoreName(saved.storeName || "");
    setWhatsapp(saved.whatsapp || "");
  }, []);

  const saveConfig = () => {
    localStorage.setItem(
      "storeConfig",
      JSON.stringify({ storeName, whatsapp })
    );
    alert("Configuración guardada");
  };

  return (
    <section style={{ marginBottom: "40px" }}>
      <h3>Configuración General</h3>

      <input
        type="text"
        placeholder="Nombre de la tienda"
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
      />

      <input
        type="text"
        placeholder="WhatsApp (519...)"
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value)}
      />

      <Button onClick={saveConfig}>Guardar</Button>
    </section>
  );
}
