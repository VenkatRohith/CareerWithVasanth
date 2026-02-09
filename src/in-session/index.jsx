import { useNavigate } from "react-router";

export default function InSession() {
  const navigate = useNavigate();
  return (
    <div style={{ margin: "auto", textAlign: "center" }}>
      <p>{`Routing Help - /{week number} for opening a particular week's in session discussed problem`}</p>
      <span>Week</span>
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          width: "min-content",
          margin: "1rem auto auto",
        }}
      >
        {Array.from({ length: 5 }, (_, idx) => idx + 1).map((val, key) => (
          <button key={key} onClick={() => navigate(`/in-session/week-${val}`)}>
            {val}
          </button>
        ))}
      </div>
    </div>
  );
}
