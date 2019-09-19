import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import SearchBarCheckbox from './SearchBarCheckbox';
import SearchBarInput from './SearchBarInput';
import setSearchParams from '../../utils/setSearchParams';

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

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '', mediaTypes: ['image'] };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.updateUrl = this.updateUrl.bind(this);
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

  updateUrl(event) {
    if (event) {
      event.preventDefault();
    }
    const { searchTerm, mediaTypes } = this.state;
    const { history } = this.props;
    const url = setSearchParams({
      query: searchTerm,
      mediaTypes: mediaTypes.toString(),
    });
    history.push(`?${url}`);
  }

  render() {
    const { searchTerm, mediaTypes } = this.state;
    return (
      <StyledSearchBar>
        <form onSubmit={e => this.updateUrl(e)}>
          <SearchBarInput
            searchTerm={searchTerm}
            handleInputChange={this.handleInputChange}
          />
          <SearchBarCheckbox
            label="Images"
            name="image"
            checked={mediaTypes.includes('image')}
            handleCheckboxChange={this.handleCheckboxChange}
          />
          <SearchBarCheckbox
            label="Videos"
            name="video"
            checked={mediaTypes.includes('video')}
            handleCheckboxChange={this.handleCheckboxChange}
          />
          <SearchBarCheckbox
            label="Audio"
            name="audio"
            checked={mediaTypes.includes('audio')}
            handleCheckboxChange={this.handleCheckboxChange}
          />
        </form>
      </StyledSearchBar>
    );
  }
}

SearchBar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};

export default SearchBar;
