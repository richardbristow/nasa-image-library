import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components/macro';

import '../styles/css/App.css';

import '../polyfills';
import getData from '../utils/getData';
import { GlobalStyle, globalTheme } from '../theme/globalStyle';

import Header from './header/Header';
import Gallery from './gallery/Gallery';
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
    this.state = { errorFetching: null };

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const url = 'https://images-api.nasa.gov/search?q=iss&media_type=image';
    this.handleSearch(url);
  }

  async handleSearch(url, event) {
    if (event) { event.preventDefault(); }
    const { errorFetching, data } = await getData(encodeURI(url));
    this.setState({ errorFetching, searchData: data });
  }

  render() {
    const { errorFetching, searchData } = this.state;
    return (
      <ThemeProvider theme={globalTheme}>
        <StyledAppWrapper>
          <GlobalStyle />
          <Header handleSearch={this.handleSearch} />
          {searchData
            ? <Gallery searchData={searchData} handlePageChange={this.handleSearch} />
            : <Loading error={errorFetching} />
          }
        </StyledAppWrapper>
      </ThemeProvider>
    );
  }
}

export default App;
