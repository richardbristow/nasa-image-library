import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components/macro';
import '../polyfills';

import { GlobalStyle, globalTheme } from '../theme/globalStyle';

import '../styles/css/App.css';

import Header from './header/Header';
import Gallery from './Gallery';
import Loading from './shared/Loading';

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
    this.state = { errorFetching: false };

    this.handleSearch = this.handleSearch.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.handleSearch({
      searchTerm: 'iss',
      mediaTypes: ['image'],
    });
  }

  async getData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.setState({
        errorFetching: false,
        searchData: data.collection,
      });
    } catch (error) {
      console.error('Fetch error', error); // eslint-disable-line no-console
      this.setState({
        errorFetching: true,
        searchData: null,
      });
    }
  }

  handleSearch({ searchTerm, mediaTypes }) {
    const url = encodeURI(`https://images-api.nasa.gov/search?q=${searchTerm}&media_type=${mediaTypes.toString()}`);
    this.getData(url);
  }


  render() {
    const { errorFetching, searchData } = this.state;
    return (
      <ThemeProvider theme={globalTheme}>
        <StyledAppWrapper>
          <GlobalStyle />
          <Header onSearch={this.handleSearch} />
          {searchData
            ? <Gallery className="gallery-wrapper" galleryData={searchData} onGetData={this.getData} />
            : <Loading error={errorFetching} />
          }
        </StyledAppWrapper>
      </ThemeProvider>
    );
  }
}

export default App;
