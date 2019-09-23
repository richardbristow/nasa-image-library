import React from 'react';
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

const SearchBar = ({ searchValues, setSearchValues, doFetch }) => {
  const handleInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setSearchValues({ ...searchValues, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { searchTerm, searchImages, searchVideo, searchAudio } = searchValues;
    const mediaTypes = [];
    if (searchImages) {
      mediaTypes.push('image');
    }
    if (searchVideo) {
      mediaTypes.push('video');
    }
    if (searchAudio) {
      mediaTypes.push('audio');
    }
    doFetch(
      `https://images-api.nasa.gov/search?q=${searchTerm}&media_type=${mediaTypes.join()}`,
    );
  };

  return (
    <StyledSearchBar>
      <form onSubmit={handleSubmit}>
        <SearchBarInput
          searchTerm={searchValues.searchTerm}
          handleInputChange={handleInputChange}
        />
        <SearchBarCheckbox
          label="Images"
          name="searchImages"
          checked={searchValues.searchImages}
          handleInputChange={handleInputChange}
        />
        <SearchBarCheckbox
          label="Videos"
          name="searchVideo"
          checked={searchValues.searchVideo}
          handleInputChange={handleInputChange}
        />
        <SearchBarCheckbox
          label="Audio"
          name="searchAudio"
          checked={searchValues.searchAudio}
          handleInputChange={handleInputChange}
        />
      </form>
    </StyledSearchBar>
  );
};

SearchBar.propTypes = {
  searchValues: PropTypes.shape({
    searchTerm: PropTypes.string,
    searchImages: PropTypes.bool,
    searchVideo: PropTypes.bool,
    searchAudio: PropTypes.bool,
  }).isRequired,
  setSearchValues: PropTypes.func.isRequired,
  doFetch: PropTypes.func.isRequired,
};

export default SearchBar;
