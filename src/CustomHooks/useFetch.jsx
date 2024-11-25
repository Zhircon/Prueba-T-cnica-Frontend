import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
   
    setIsLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
      .then((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);
  return { data, isLoading, error };
}