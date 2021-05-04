import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import App from '../App';

test('renders without throwing errors', async () => {
  window.scrollTo = jest.fn();
  const history = createMemoryHistory();
  const container = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  expect(container).toMatchSnapshot();
});
