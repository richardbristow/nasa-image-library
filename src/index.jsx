import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components/macro';

import { GlobalStyle, globalTheme } from './theme/globalStyle';
import App from './components/App';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <ThemeProvider theme={globalTheme}>
    <Router>
      <GlobalStyle />
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById('root'),
);

registerServiceWorker();
