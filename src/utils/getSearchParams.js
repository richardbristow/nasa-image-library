const getSearchParams = location => {
  const searchParams = new URLSearchParams(location.search);
  return {
    q: searchParams.get('q') || '',
    media_type: searchParams.get('media_type') || '',
  };
};

export default getSearchParams;
