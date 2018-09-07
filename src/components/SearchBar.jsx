import React from 'react';
import '../styles/css/SearchBar.css';
import SearchBarCheckbox from './SearchBarCheckbox';
import SearchBarInput from './SearchBarInput';

class SearchBar extends React.Component {
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


  // Updates the state based on user input
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
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
    const { image, video, audio, searchTerm } = this.state;
    return (
      <div className="search-wrapper">
        <form id="search-form" onSubmit={this.handleSubmit}>
          <SearchBarInput value={searchTerm} handleInputChange={this.handleInputChange} />
          <div id="search-checkboxes">
            <SearchBarCheckbox label="Images" name="image" checked={image} />
            <SearchBarCheckbox label="Videos" name="video" checked={video} />
            <SearchBarCheckbox label="Audio" name="audio" checked={audio} />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
