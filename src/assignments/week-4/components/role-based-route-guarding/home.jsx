import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Home() {
  const [role, setRole] = useState(
    () => sessionStorage.getItem("role") ?? "user",
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("role")) {
      sessionStorage.setItem("role", "user");
    }
  }, []);

  const handleChangeRole = (role) => {
    setRole(role);
    sessionStorage.setItem("role", role);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        height: "100vh",
        margin: "auto",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h3>
        Navigate to respective routes using below buttons or directly append
        respective the routes
      </h3>
      <p>
        Current role: <b>{role}</b>
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <button
          disabled={role === "admin"}
          onClick={() => handleChangeRole("admin")}
        >
          Change role to Admin
        </button>
        <button
          disabled={role === "user"}
          onClick={() => handleChangeRole("user")}
        >
          Change role to User
        </button>
        <button onClick={() => navigate("/assignments/week-4/5/admin")}>
          Navigate to '/admin'
        </button>
        <button onClick={() => navigate("/assignments/week-4/5/user")}>
          Navigate to '/user'
        </button>
        <button onClick={() => navigate("/assignments/week-4")}>
          Navigate to Assignment-4 Menu
        </button>
      </div>
    </div>
  );
}
