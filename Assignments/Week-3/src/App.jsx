import { useNavigate } from "react-router";
import "./App.css";

function App() {
  const navigate = useNavigate();
  return (
    <div>
      <p>{`Routing Help - /{assignmentNumber} for opening a particular assignment`}</p>
      <span>Assignment Number</span>
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          width: "min-content",
          margin: "auto",
        }}
      >
        {Array.from({ length: 7 }, (_, idx) => idx + 1).map((val, key) => (
          <button key={key} onClick={() => navigate(`/${val}`)}>
            {val}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
