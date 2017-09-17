import React, { Component } from 'react';
import '../styles/css/App.css';

import SearchBar from './SearchBar';
import Gallery from './Gallery';
import LoadingSpinner from './LoadingSpinner';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchData: null };

    this.handleSearch = this.handleSearch.bind(this);
    this.getData = this.getData.bind(this);
  }


  // Fills the pages with images on initial load
  componentDidMount() {
    this.handleSearch({
      searchTerm: 'iss',
      image: true,
      video: false,
      audio: false,
    });
  }


  // Fetches data from the NASA api
  async getData(url) {
    // this.setState({
    //   searchData: null,
    // });
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      searchData: data.collection,
    });
  }


  // Handles the search event
  handleSearch(searchObj) {
    const mediaTypes = [];
    let query = '';

    // Polyfill for object entries. IE compatibilty
    if (!Object.entries) {
      Object.entries = (obj) => {
        const ownProps = Object.keys(obj);
        let i = ownProps.length;
        const resArray = new Array(i);
        while (i--) {
          resArray[i] = [ownProps[i], obj[ownProps[i]]];
        }
        return resArray;
      };
    }

    Object.entries(searchObj).forEach(([key, value]) => {
      if (key !== 'searchTerm' && value === true) {
        mediaTypes.push(key);
      } else if (value !== false) {
        query = value;
      }
    });
    let url = `https://images-api.nasa.gov/search?q=${query}&media_type=${mediaTypes.toString()}`;
    url = url.replace(/ /g, '%20');
    this.getData(url);
  }


  render() {
    return (
      <div className="wrapper">
        <div className="header-wrapper">
          <h1>NASA <span>Media Library</span></h1>
          <SearchBar onSearch={this.handleSearch} />
        </div>
        {this.state.searchData ?
          <Gallery
            className="gallery-wrapper"
            galleryData={this.state.searchData}
            onGetData={this.getData}
          /> : <LoadingSpinner />}
      </div>
    );
  }
}

export default App;
