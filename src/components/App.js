import React, { Component } from 'react';
import '../styles/css/App.css';

import SearchBar from './SearchBar';
import Gallery from './Gallery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchData: {} };

    this.handleSearch = this.handleSearch.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.handleSearch({
      searchTerm: 'sun',
      image: true,
      video: false,
      audio: false,
    });
  }

  async getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      searchData: data.collection,
    });
  }

  handleSearch(searchObj) {
    const mediaTypes = [];
    let query = '';

    // Polyfill for object entries IE compatibilty
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
    const url = `https://images-api.nasa.gov/search?q=${query}&media_type=${mediaTypes.toString()}`;
    this.getData(url);
  }

  render() {
    return (
      <div className="wrapper">
        <div className="header-wrapper">
          <h2>Nasa Image Library</h2>
          <SearchBar onSearch={this.handleSearch} />
        </div>
        <Gallery galleryData={this.state.searchData} onGetData={this.getData}/>
      </div>
    );
  }
}

export default App;
