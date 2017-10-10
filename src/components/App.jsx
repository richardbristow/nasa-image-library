import React, { Component } from 'react';
import '../styles/css/App.css';

import SearchBar from './SearchBar';
import Gallery from './Gallery';
import LoadingSpinner from './LoadingSpinner';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchData: null, err: false };

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
    this.setState({
      searchData: null,
    });
    let data = {};
    let err = false;
    try {
      const response = await fetch(url);
      data = await response.json();
    } catch (e) {
      console.log('Houston we have a problem.');
      err = true;
    }
    this.setState({
      err,
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
    let content = null;
    if (this.state.err) {
      content = (
        <div className="fetch-errors">
          <p>Houston we have a problem.</p>
          <p>Something went wrong.</p>
        </div>
      );
    } else if (!this.state.searchData) {
      content = <LoadingSpinner />;
    } else {
      content = (
        <Gallery
          className="gallery-wrapper"
          galleryData={this.state.searchData}
          onGetData={this.getData}
        />
      );
    }
    return (
      <div className="wrapper">
        <div className="header-wrapper">
          <h1>NASA <span>Media Library</span></h1>
          <SearchBar onSearch={this.handleSearch} />
        </div>
        {content}
      </div>
    );
  }
}

export default App;