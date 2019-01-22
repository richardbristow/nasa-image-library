const setSearchParams = ({ query, mediaTypes }) => {
  const searchParams = new URLSearchParams();
  searchParams.set('q', query || '');
  searchParams.set('media_type', mediaTypes || '');
  return searchParams.toString();
};

export default setSearchParams;
