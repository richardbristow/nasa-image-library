import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components/macro';

import { GlobalStyle, globalTheme } from '../theme/globalStyle';

import Header from './header/Header';
import Gallery from './gallery/Gallery';

const StyledApp = styled.div`
  width: 100%;
  min-width: 200px;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  background: ${({ theme }) => theme.ghostWhite};
  height: 100vh;
`;

const App = ({ history, query }) => (
  <ThemeProvider theme={globalTheme}>
    <>
      <GlobalStyle />
      <StyledApp>
        <Header history={history} />
        <Gallery query={query} />
      </StyledApp>
    </>
  </ThemeProvider>
);

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  query: PropTypes.shape({
    q: PropTypes.string,
    media_type: PropTypes.string,
  }).isRequired,
};

export default App;
