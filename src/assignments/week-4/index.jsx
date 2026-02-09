import { useNavigate } from "react-router";

export default function Week4() {
  const navigate = useNavigate();
  return (
    <div style={{ margin: "auto", textAlign: "center" }}>
      <p>{`Routing Help - /{assignmentNumber} for opening a particular assignment`}</p>
      <span>Assignment Number</span>
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          width: "min-content",
          margin: "1rem auto auto",
        }}
      >
        {Array.from({ length: 5 }, (_, idx) => idx + 1).map((val, key) => (
          <button
            key={key}
            onClick={() => navigate(`/assignments/week-4/${val}`)}
          >
            {val}
          </button>
        ))}
      </div>
    </div>
  );
}
