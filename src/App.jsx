import { useNavigate } from "react-router";
import "./App.css";

function App() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Assignments Hub</h1>
      <p>Select an assignment to get started</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          justifyContent: "center",
          width: "min-content",
          margin: "auto",
        }}
      >
        <button onClick={() => navigate("/assignments/week-3")}>
          Week 3 Assignments
        </button>
        <button onClick={() => navigate("/assignments/week-4")}>
          Week 4 Assignments
        </button>
      </div>
      {/* <button onClick={() => navigate("/in-session")}>In-Session</button> */}
    </div>
  );
}

export default App;
