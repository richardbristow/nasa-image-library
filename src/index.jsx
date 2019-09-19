/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import App from './components/App';
import NoRoute from './components/shared/NoRoute';
import getSearchParams from './utils/getSearchParams';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/search" />} />
      <Route
        path="/search"
        render={({ location, history }) => {
          const query = getSearchParams(location);
          return <App query={query} history={history} />;
        }}
      />
      <Route component={NoRoute} />
    </Switch>
  </Router>,
  document.getElementById('root'),
);
registerServiceWorker();
