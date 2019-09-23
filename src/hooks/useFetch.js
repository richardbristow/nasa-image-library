import { useState, useEffect } from 'react';

const useFetch = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(null);
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        setIsError(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

export default useFetch;
