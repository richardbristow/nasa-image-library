import React from 'react';

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

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSearch(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="searchTerm"
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
          placeholder="e.g. Jupiter"
        />
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
        <input type="submit" value="Search" />
      </form>
    );
  }
}

export default SearchBar;
