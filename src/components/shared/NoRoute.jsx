import React from 'react';
import { Link } from 'react-router-dom';

const NoRoute = () => (
  <React.Fragment>
    Uh-oh! No page exists why dont you go back&nbsp;
    <Link to="/search">home</Link>
    .
  </React.Fragment>
);

export default NoRoute;
