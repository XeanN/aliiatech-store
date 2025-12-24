export default function Login() {
  const handleLogin = () => {
    localStorage.setItem("admin", "true");
    window.location.href = "/admin/dashboard";
  };

  return (
    <div className="container">
      <h1>Login Admin</h1>

      <button
        onClick={handleLogin}
        style={{ padding: "12px 20px", marginTop: "20px" }}
      >
        Ingresar como Admin
      </button>
    </div>
  );
}
