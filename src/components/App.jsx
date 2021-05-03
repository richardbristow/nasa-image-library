import React from 'react';
import styled from 'styled-components/macro';
import { Route, Switch, useLocation } from 'react-router-dom';

import Header from './header/Header';
import Gallery from './gallery/Gallery';
import MediaWrapper from './media/MediaWrapper';
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

const StyledMain = styled.main`
  background: ${({ theme }) => theme.ghostWhite};
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
`;

const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <StyledApp>
      <Header />
      <StyledMain>
        <Switch location={background || location}>
          <Route exact path={['/', '/search']}>
            <Gallery />
          </Route>
          <Route path="/asset/:nasaId">
            <MediaWrapper />
          </Route>
          <Route path="*">
            <NoRoute />
          </Route>
        </Switch>
        {background && (
          <Route path="/asset/:nasaId">
            <Modal>
              <MediaWrapper inModal />
            </Modal>
          </Route>
        )}
      </StyledMain>
    </StyledApp>
  );
};

export default App;
