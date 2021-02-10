import React from 'react';
import styled from 'styled-components/macro';

import useFetch from '../hooks/useFetch';
import Header from './header/Header';
import Gallery from './gallery/Gallery';
import Loading from './shared/Loading';
import Error from './shared/Error';

const StyledApp = styled.div`
  width: 100%;
  min-width: 200px;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  background: ${({ theme }) => theme.ghostWhite};
  height: 100vh;
`;

const App = () => {
  const [{ fetchedData, isLoading, isError }, doFetch] = useFetch(
    'https://images-api.nasa.gov/search?q=iss&media_type=image',
    {
      collection: { items: [] },
    },
  );

  const { collection: data } = fetchedData;

  return (
    <StyledApp>
      <Header doFetch={doFetch} />
      {isError && <Error />}
      {isLoading ? <Loading /> : <Gallery data={data} doFetch={doFetch} />}
    </StyledApp>
  );
};

export default App;
