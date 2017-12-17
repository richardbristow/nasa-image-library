import React from 'react';
import '../styles/css/PageNavigation.css';

// Create the page navigation buttons.
const PageNavigation = ({ onPageChange, dataUrl, navType}) => (
  <div className="page-nav-button">
    <button onClick={onPageChange} data-page-url={dataUrl}>
      {navType}
    </button>
  </div>
)

export default PageNavigation;
