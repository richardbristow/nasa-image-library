import React from 'react';

function PageNavigation(props) {
  return (
    <div>
      <button onClick={props.onPageChange} data-page-url={props.dataUrl}>
        {props.navType}
      </button>
    </div>
  );
}

export default PageNavigation;
