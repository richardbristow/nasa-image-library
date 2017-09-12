import React, { Component } from 'react';
import '../styles/css/App.css';

import SearchBar from './SearchBar';
import Gallery from './Gallery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchData: {} };

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.handleSearch({
      searchTerm: 'galaxy',
      image: true,
      video: false,
      audio: false,
    });
  }

  async handleSearch(searchObj) {
    const mediaTypes = [];
    let query = '';
    Object.entries(searchObj).forEach(([key, value]) => {
      if (key !== 'searchTerm' && value === true) {
        mediaTypes.push(key);
      } else if (value !== false) {
        query = value;
      }
    });
    const url = `https://images-api.nasa.gov/search?q=${query}&media_type=${mediaTypes.toString()}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      searchData: data.collection,
    });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="app-header">
          <h2>Nasa Image Library</h2>
          <SearchBar onSearch={this.handleSearch} />
        </div>
        <Gallery galleryData={this.state.searchData} />
      </div>
    );
  }
}

export default App;
