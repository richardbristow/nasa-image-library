import React from 'react';
import '../styles/css/LoadingSpinner.css';

// Create the loading spinner
function LoadingSpinner() {
  return (
    <div className="loading-spinner"><i className="fa fa-circle-o-notch fa-spin" /></div>
  );
}

export default LoadingSpinner;
