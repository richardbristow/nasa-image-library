/* eslint-disable react/jsx-filename-extension */

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './components/App';
import getSearchParams from './utils/getSearchParams';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <Fragment>
      <Route
        path="/"
        render={({ location, history }) => {
          const query = getSearchParams(location);
          return <App query={query} history={history} />;
        }}
      />
    </Fragment>
  </Router>, document.getElementById('root'),
);
registerServiceWorker();
