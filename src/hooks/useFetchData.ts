import { useEffect, useState } from "react";

interface FetchDataResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useFetchData = <T>(
  url: string,
  localStorageKey: string
): FetchDataResult<T> => {
  const [data, setData] = useState<T | null>(null);
  // const [data, setData] = useState<T | null>(() => {
  //   //initial state from the localstorage if available
  //   const storedData = localStorage.getItem(localStorageKey);
  //   return storedData ? JSON.parse(storedData) : null;
  // });
  const [loading, setLoading] = useState<boolean>(!data);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      //skip fetching if data is available in the localStorgae
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const localData = localStorage.getItem(localStorageKey);
        if (localData) {
          // Load data from localStorage
          setData(JSON.parse(localData));
        } else {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
          }
          const result = await response.json();
          setData(result);
          localStorage.setItem(localStorageKey, JSON.stringify(result)); // Save to localStorage
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, localStorageKey, data]);

  return { data, loading, error };
};

export default useFetchData;
