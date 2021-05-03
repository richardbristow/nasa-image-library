import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components/macro';

import { GlobalStyle, globalTheme } from './theme/globalStyle';
import App from './components/App';
import ScrollToTop from './components/shared/ScrollToTop';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <ThemeProvider theme={globalTheme}>
    <Router>
      <ScrollToTop />
      <GlobalStyle />
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById('root'),
);

registerServiceWorker();
