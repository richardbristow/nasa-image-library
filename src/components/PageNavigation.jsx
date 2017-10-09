import React from 'react';
import '../styles/css/PageNavigation.css';

// Create the page navigation buttons.
function PageNavigation(props) {
  return (
    <div className="page-nav-button">
      <button onClick={props.onPageChange} data-page-url={props.dataUrl}>
        {props.navType}
      </button>
    </div>
  );
}

export default PageNavigation;
