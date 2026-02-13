import useFetchCached from "../hooks/useFetchCached";

const defaultURL = "https://jsonplaceholder.typicode.com/todos/1";

export default function CacheAPIResponses() {
  const { data, error, loading, clearCache, reFetch } = useFetchCached({
    url: defaultURL,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        margin: "auto",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <div>{loading ? "Loading" : (error ?? JSON.stringify(data))}</div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button onClick={reFetch}>Refetch</button>
        <button onClick={() => clearCache({ clearAll: true })}>
          Clear Cache
        </button>
      </div>
    </div>
  );
}

/*

1st Attempt - 44 min

Have refered Singleton Pattern initialization once.
 */
