import React from 'react';
import '../styles/css/SearchBar.css';

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

    // if (input.searchTerm === '') {
    //   console.log('please enter searchterm');
    // } else if (!input.image && !input.image && !input.image) {
    //   console.log('please select a media type');
    // } else if ((input.searchTerm === '') && (!input.image && !input.image && !input.image)) {
    //   console.log('no media or search propvede');
    // } else {
    //   this.props.onSearch(this.state);
    // }
  }


  render() {
    return (
      <div className="search-wrapper">
        <form id="search-form" onSubmit={this.handleSubmit}>
          <div id="search-bar">
            <div id="search-bar-flex">
              <input
                name="searchTerm"
                type="text"
                value={this.state.searchTerm}
                onChange={this.handleInputChange}
                placeholder="e.g. Jupiter"
              />
              <button type="submit">
                <span className="fa fa-search" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div id="search-checkboxes">
            <label htmlFor="imageCheckbox">Images</label>
            <input
              name="image"
              type="checkbox"
              id="imageCheckbox"
              checked={this.state.image}
              onChange={this.handleInputChange}
            />
            <label htmlFor="videoCheckbox">Videos</label>
            <input
              name="video"
              type="checkbox"
              id="videoCheckbox"
              checked={this.state.video}
              onChange={this.handleInputChange}
            />
            <label htmlFor="audioCheckbox">Audio</label>
            <input
              name="audio"
              type="checkbox"
              id="audioCheckbox"
              checked={this.state.audio}
              onChange={this.handleInputChange}
            />
          </div>
          {/* <input type="submit" value="Search" /> */}
        </form>
      </div>
    );
  }
}

export default SearchBar;
