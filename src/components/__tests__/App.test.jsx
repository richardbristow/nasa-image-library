import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders without throwing errors', async () => {
  const container = render(<App />);
  expect(container).toMatchSnapshot();
});
