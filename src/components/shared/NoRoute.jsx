import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'styled-components/macro';

const NoRoute = () => (
  <div
    css={css`
      text-align: center;
    `}
  >
    <h1>404</h1>
    <p>Page does not exist.</p>
    <p>
      Uh-oh! No page exists why dont you go back&nbsp;
      <Link to="/">home</Link>.
    </p>
  </div>
);

export default NoRoute;
