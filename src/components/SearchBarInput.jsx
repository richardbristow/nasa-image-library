import React from 'react';

const SearchBarInput = ({ searchTerm, handleInputChange }) => (
  <div id="search-bar">
    <div id="search-bar-flex">
      <input
        name="searchTerm"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="e.g. ISS"
      />
      <button type="submit">
        <span className="fa fa-search" aria-hidden="true" />
      </button>
    </div>
  </div>
);

export default SearchBarInput;
