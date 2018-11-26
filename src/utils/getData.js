const getData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return { errorFetching: null, data: data.collection };
  } catch (error) {
    console.error('Fetch error', error); // eslint-disable-line no-console
    return { errorFetching: error, data: null };
  }
};

export default getData;
