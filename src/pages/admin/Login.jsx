import Button from "../../components/Button";

export default function Login() {
  const handleLogin = () => {
    localStorage.setItem("admin", "true");
    window.location.href = "/#/admin/dashboard";
  };

  return (
    <div style={{ maxWidth: "400px", margin: "60px auto" }}>
      <h2>Login Admin</h2>
      <Button onClick={handleLogin}>Ingresar al Dashboard</Button>
    </div>
  );
}
