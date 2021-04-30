import React from 'react';
import styled from 'styled-components/macro';
import { Route, Switch, useLocation } from 'react-router-dom';

import useFetch from '../hooks/useFetch';
import Header from './header/Header';
import Gallery from './gallery/Gallery';
import GalleryAssetView from './gallery/GalleryAssetView';
import Modal from './modal/Modal';
import NoRoute from './shared/NoRoute';

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
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <StyledApp>
      <Header doFetch={doFetch} />
      <Switch location={background || location}>
        <Route exact path="/">
          <Gallery
            data={data}
            doFetch={doFetch}
            isLoading={isLoading}
            isError={isError}
          />
        </Route>
        <Route path="/asset/:nasaId">
          <GalleryAssetView />
        </Route>
        <Route path="*">
          <NoRoute />
        </Route>
      </Switch>
      {background && (
        <Route path="/asset/:nasaId">
          <Modal>
            <GalleryAssetView inModal />
          </Modal>
        </Route>
      )}
    </StyledApp>
  );
};

export default App;
