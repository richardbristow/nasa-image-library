import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components/macro';

import { GlobalStyle, globalTheme } from '../theme/globalStyle';

import '../styles/css/App.css';
import '../polyfills';

import SearchBar from './SearchBar';
import Gallery from './Gallery';
import LoadingSpinner from './LoadingSpinner';

const StyledAppWrapper = styled.div`
  width: 100%;
  min-width: 200px;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  background: ${({ theme }) => theme.ghostWhite};
  height:100vh;
`;

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
    const { err, searchData } = this.state;
    if (err) {
      content = (
        <div className="fetch-errors">
          <p>Houston we have a problem.</p>
          <p>Something went wrong.</p>
        </div>
      );
    } else if (!searchData) {
      content = <LoadingSpinner />;
    } else {
      content = (
        <Gallery
          className="gallery-wrapper"
          galleryData={searchData}
          onGetData={this.getData}
        />
      );
    }
    return (
      <ThemeProvider theme={globalTheme}>
        <StyledAppWrapper>
          <GlobalStyle />
          <div className="header-wrapper">
            <h1>
              NASA&nbsp;
              <span>Media Library</span>
            </h1>
            <SearchBar onSearch={this.handleSearch} />
          </div>
          {content}
        </StyledAppWrapper>
      </ThemeProvider>
    );
  }
}

export default App;
