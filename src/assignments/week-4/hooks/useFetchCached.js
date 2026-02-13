/*
4th Question

Airbnb
Create a reusable custom React hook for fetching data that caches API
responses and prevents duplicate requests across components.
The hook should expose loading and error states and provide a way
to refresh or invalidate cached data.

Example: Two components requesting /users should share cached data instead
of triggering two API calls.
*/

import { useCallback, useEffect, useRef, useState } from "react";
import apiCacheService from "../services/api-cache";

/**
 *
 * @param {{url: string}} apiConfig
 */
const useFetchCached = ({ url }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const apiCacheServiceRef = useRef(apiCacheService);
  const isFetchingRef = useRef(false);

  const reFetch = async () => {
    await fetchData();
  };

  /**
   *
   * @param {{key?: string, clearAll?: boolean}} cacheConfig
   * @returns
   */
  function clearCache({ key = "", clearAll = false }) {
    if (clearAll) {
      apiCacheServiceRef.current.clearEntireCache();
      return true;
    }
    if (typeof key !== "string" || key.trim() === "") {
      throw Error("Invalid key");
    }
    apiCacheService.clearSpecificCache(key);
    return true;
  }

  const fetchData = useCallback(async () => {
    setLoading(true);
    if (apiCacheServiceRef.current.isDataCached(url)) {
      if (error) setError(null);
      setData(apiCacheServiceRef.current.getCachedData(url));
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (error) setError(null);
      apiCacheServiceRef.current.cacheData(url, data);
      setData(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Some error occured");
      }
    } finally {
      setLoading(false);
    }
  }, [error, url]);

  useEffect(() => {
    if (isFetchingRef.current) {
      return;
    }
    isFetchingRef.current = true;
    fetchData(url);
  }, [url, fetchData]);

  return { loading, data, error, reFetch, clearCache };
};

export default useFetchCached;
