import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components/macro';

import { GlobalStyle, globalTheme } from '../theme/globalStyle';
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
  const [searchValues, setSearchValues] = useState({
    searchTerm: '',
    searchImages: true,
    searchVideo: false,
    searchAudio: false,
  });

  const [{ data, isLoading, isError }, doFetch] = useFetch(
    'https://images-api.nasa.gov/search?q=iss&media_type=image',
    { collection: { items: [] } },
  );

  return (
    <ThemeProvider theme={globalTheme}>
      <>
        <GlobalStyle />
        <StyledApp>
          <Header
            searchValues={searchValues}
            setSearchValues={setSearchValues}
            doFetch={doFetch}
          />
          {isError && <Error />}
          {isLoading ? <Loading /> : <Gallery data={data} doFetch={doFetch} />}
        </StyledApp>
      </>
    </ThemeProvider>
  );
};

export default App;
