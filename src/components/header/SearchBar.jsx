import React, { Component } from 'react';
import styled from 'styled-components/macro';
// import '../../styles/css/SearchBar.css';
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
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    const { getData } = this.props;
    const { searchTerm, mediaTypes } = this.state;
    const url = encodeURI(`https://images-api.nasa.gov/search?q=${searchTerm}&media_type=${mediaTypes.toString()}`);
    getData(url);
  }


  render() {
    const { searchTerm, mediaTypes } = this.state;
    return (
      <StyledSearchBar>
        <form onSubmit={this.handleSubmit}>
          <SearchBarInput value={searchTerm} handleInputChange={this.handleInputChange} />
          <SearchBarCheckbox label="Images" name="image" checked={mediaTypes.includes('image')} handleCheckboxChange={this.handleCheckboxChange} />
          <SearchBarCheckbox label="Videos" name="video" checked={mediaTypes.includes('video')} handleCheckboxChange={this.handleCheckboxChange} />
          <SearchBarCheckbox label="Audio" name="audio" checked={mediaTypes.includes('audio')} handleCheckboxChange={this.handleCheckboxChange} />
        </form>
      </StyledSearchBar>
    );
  }
}

export default SearchBar;
