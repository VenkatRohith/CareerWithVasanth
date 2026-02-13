import { useNavigate } from "react-router";

export default function UserPage() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        gap: "0.5rem",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <h2>User Page</h2>
      <button onClick={() => navigate("/assignments/week-4/5")}>
        Navigate to Home
      </button>
    </div>
  );
}
