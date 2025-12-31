import { useSearchParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import GeneralSettings from "./GeneralSettings";
import HomeSettings from "./HomeSettings";
import ThemeSettings from "./ThemeSettings";

export default function Dashboard() {
  const [params] = useSearchParams();
  const tab = params.get("tab") || "general";

  const renderTab = () => {
    switch (tab) {
      case "home":
        return <HomeSettings />;
      case "theme":
        return <ThemeSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <AdminLayout>
      <h1 style={{ marginBottom: "24px" }}>
        Dashboard – {tab.toUpperCase()}
      </h1>

      {renderTab()}
    </AdminLayout>
  );
}
