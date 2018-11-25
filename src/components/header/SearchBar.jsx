import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import SearchBarCheckbox from './SearchBarCheckbox';
import SearchBarInput from './SearchBarInput';

const StyledSearchBar = styled.div`
  width: 50%;
  margin: 0 auto;

  /* @include mqMax(360px) {
    width: 80%;
  };

  @include mqMax(700px) {
    width: 70%;
  };

  @include mqMax(900px) {
    width: 60%;
  }; */
`;

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '', mediaTypes: ['image'] };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleCheckboxChange({ target }) {
    const { name } = target;
    const { mediaTypes } = this.state;
    if (mediaTypes.includes(name)) {
      this.setState(prevState => ({
        mediaTypes: prevState.mediaTypes.filter(type => type !== name),
      }));
    } else {
      this.setState(prevState => ({
        mediaTypes: [...prevState.mediaTypes, name],
      }));
    }
  }

  render() {
    const { handleSearch } = this.props;
    const { searchTerm, mediaTypes } = this.state;
    const url = `https://images-api.nasa.gov/search?q=${searchTerm}&media_type=${mediaTypes.toString()}`;
    return (
      <StyledSearchBar>
        <form onSubmit={e => handleSearch(url, e)}>
          <SearchBarInput searchTerm={searchTerm} handleInputChange={this.handleInputChange} />
          <SearchBarCheckbox label="Images" name="image" checked={mediaTypes.includes('image')} handleCheckboxChange={this.handleCheckboxChange} />
          <SearchBarCheckbox label="Videos" name="video" checked={mediaTypes.includes('video')} handleCheckboxChange={this.handleCheckboxChange} />
          <SearchBarCheckbox label="Audio" name="audio" checked={mediaTypes.includes('audio')} handleCheckboxChange={this.handleCheckboxChange} />
        </form>
      </StyledSearchBar>
    );
  }
}

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
