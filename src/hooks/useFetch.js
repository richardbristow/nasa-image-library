import { useState, useEffect } from 'react';

const useFetch = (initialUrl, initialData, getMetaData) => {
  const [fetchedData, setData] = useState(initialData);
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
        if (getMetaData) {
          const metadataUrl = responseData.collection.items.filter((item) =>
            item.href.includes('metadata.json'),
          )[0].href;
          const metadataResponse = await fetch(metadataUrl);
          const metadataResponseData = await metadataResponse.json();
          setData({
            responseData,
            metadataResponseData,
          });
        } else {
          setData(responseData);
        }
      } catch (error) {
        setIsError(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ fetchedData, isLoading, isError }, setUrl];
};

export default useFetch;
