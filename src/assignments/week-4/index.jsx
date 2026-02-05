import { useNavigate } from "react-router";

export default function Week3() {
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
          <button
            key={key}
            onClick={() => navigate(`/assignments/week-3/${val}`)}
          >
            {val}
          </button>
        ))}
      </div>
    </div>
  );
}
