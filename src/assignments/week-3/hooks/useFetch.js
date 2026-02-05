import { useEffect, useRef, useState } from "react";
import apiCache from "../services/api-response-cache";

const useFetch = (url) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiResponseCacheRef = useRef(null);

  /**
   *
   * @param {string} url
   * @returns {Promise<object | null>}
   */
  const fetchData = async (url) => {
    setLoading(true);
    try {
      const cachedData = apiResponseCacheRef.current.getCachedResponse(url);
      if (cachedData) {
        console.log("returning cached data");
        setData(cachedData);
        return cachedData;
      }
      console.log("returning called data");
      const apiResponse = await fetch(url);
      const apiData = await apiResponse.json();
      if (!apiData) {
        throw Error("Some error occured");
      }
      setData(apiData);
      apiResponseCacheRef.current.cacheResponse(url, apiData);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Some error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchData(url);
  };

  useEffect(() => {
    if (apiResponseCacheRef.current === null)
      apiResponseCacheRef.current = apiCache;
  }, []);

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return { data, loading, error, refetch };
};

export default useFetch;
