import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import SearchBarCheckbox from './SearchBarCheckbox';
import SearchBarInput from './SearchBarInput';

const StyledSearchBar = styled.div`
  width: 50%;
  margin: 0 auto;

  @media screen and (max-width: 360px) {
    width: 80%;
  }

  @media screen and (max-width: 700px) {
    width: 70%;
  }

  @media screen and (max-width: 900px) {
    width: 60%;
  }
`;

const SearchBar = ({ doFetch }) => {
  const [searchValues, setSearchValues] = useState({
    searchTerm: '',
    searchImages: true,
    searchVideos: false,
    searchAudio: false,
  });

  const handleInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setSearchValues({ ...searchValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      searchTerm,
      searchImages,
      searchVideos,
      searchAudio,
    } = searchValues;
    const mediaTypes = [];
    if (searchImages) {
      mediaTypes.push('image');
    }
    if (searchVideos) {
      mediaTypes.push('video');
    }
    if (searchAudio) {
      mediaTypes.push('audio');
    }
    doFetch(
      `https://images-api.nasa.gov/search?q=${encodeURIComponent(
        searchTerm,
      )}&media_type=${encodeURIComponent(mediaTypes.join())}`,
    );
  };

  const checkboxes = ['Images', 'Videos', 'Audio'];
  return (
    <StyledSearchBar>
      <form onSubmit={handleSubmit}>
        <SearchBarInput
          searchTerm={searchValues.searchTerm}
          handleInputChange={handleInputChange}
        />
        {checkboxes.map((checkbox) => (
          <SearchBarCheckbox
            key={checkbox}
            label={checkbox}
            name={`search${checkbox}`}
            checked={searchValues[`search${checkbox}`]}
            handleInputChange={handleInputChange}
          />
        ))}
      </form>
    </StyledSearchBar>
  );
};

SearchBar.propTypes = {
  doFetch: PropTypes.func.isRequired,
};

export default SearchBar;
