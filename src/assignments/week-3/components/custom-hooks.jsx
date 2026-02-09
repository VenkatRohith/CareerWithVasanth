/*
3rd Question
Airbnb - Custom Hooks

1. Create a reusable custom hook called useFetch that fetches data from a given URL and returns { data, loading, error }.

2. Implement an in-memory caching mechanism such that: If the same URL is requested again within 2 minutes, the hook should return cached data instead of making a new API call.

3. If the cache has expired (older than 2 minutes), a fresh network request should be made and the cache updated.

4. The cache should be shared across multiple components using the hook, not reset on every re-render.
*/

// import { useEffect } from "react";
import useFetch from "../hooks/useFetch";

export default function CustomHooks() {
  const { data, loading, error /* refetch */ } = useFetch(
    "https://jsonplaceholder.typicode.com/todos/1",
  );

  /* useEffect(() => {
    const timeoutId = setInterval(async () => {
      await refetch();
    }, 2000);

    return () => {
      clearInterval(timeoutId);
    };
  }, [refetch]); */

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {JSON.stringify(data)}
    </div>
  );
}

/*
1st Attempt - 1hr 15mins

 Took some help on the singleton imeplementation in JS from internet.
 */
