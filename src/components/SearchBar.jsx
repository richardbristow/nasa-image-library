import React, { Component } from 'react';
import '../styles/css/SearchBar.css';
import SearchBarCheckbox from './SearchBarCheckbox';
import SearchBarInput from './SearchBarInput';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      image: true,
      video: true,
      audio: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }


  // Handles the submit event
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSearch(this.state);
  }


  render() {
    const {
      image, video, audio, searchTerm,
    } = this.state;
    return (
      <div className="search-wrapper">
        <form id="search-form" onSubmit={this.handleSubmit}>
          <SearchBarInput value={searchTerm} handleInputChange={this.handleInputChange} />
          <div id="search-checkboxes">
            <SearchBarCheckbox label="Images" name="image" checked={image} handleInputChange={this.handleInputChange} />
            <SearchBarCheckbox label="Videos" name="video" checked={video} handleInputChange={this.handleInputChange} />
            <SearchBarCheckbox label="Audio" name="audio" checked={audio} handleInputChange={this.handleInputChange} />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
