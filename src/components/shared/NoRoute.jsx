import React from 'react';
import { Link } from 'react-router-dom';

const NoRoute = () => (
  <>
    <h1>404</h1>
    <p>Page does not exist.</p>
    <p>
      Uh-oh! No page exists why dont you go back&nbsp;
      <Link to="/">home</Link>.
    </p>
  </>
);

export default NoRoute;
