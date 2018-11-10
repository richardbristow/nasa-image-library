import React from 'react';
import PropTypes from 'prop-types';

import '../styles/css/PageNavigation.css';

const PageNavigation = ({ onPageChange, dataUrl, navType }) => (
  <div className="page-nav-button">
    <button type="button" onClick={onPageChange} data-page-url={dataUrl}>
      {navType}
    </button>
  </div>
);

PageNavigation.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  dataUrl: PropTypes.string.isRequired,
  navType: PropTypes.string.isRequired,
};

export default PageNavigation;
