import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useHistory, useLocation } from 'react-router-dom';

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

const SearchBar = () => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [searchValues, setSearchValues] = useState({
    searchTerm: '',
    searchImages: true,
    searchVideos: false,
    searchAudio: false,
  });

  useEffect(() => {
    setSearchValues({
      searchTerm: queryParams.has('q') ? queryParams.get('q') : '',
      searchImages: queryParams.has('media_type')
        ? queryParams.get('media_type').includes('image')
        : true,
      searchVideos: queryParams.has('media_type')
        ? queryParams.get('media_type').includes('video')
        : false,
      searchAudio: queryParams.has('media_type')
        ? queryParams.get('media_type').includes('audio')
        : false,
    });
  }, [location]);

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

    const buildQueryParams = new URLSearchParams();
    const mediaTypes = [];
    if (searchTerm) {
      buildQueryParams.append('q', searchTerm);
    }
    if (searchImages) {
      mediaTypes.push('image');
    }
    if (searchVideos) {
      mediaTypes.push('video');
    }
    if (searchAudio) {
      mediaTypes.push('audio');
    }
    buildQueryParams.append('media_type', mediaTypes.join());
    history.push(`/search?${buildQueryParams.toString()}`);
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

export default SearchBar;
