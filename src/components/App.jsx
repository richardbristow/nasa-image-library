import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components/macro';

import '../styles/css/App.css';

import '../polyfills';
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
    this.state = { errorFetching: false };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    const url = encodeURI('https://images-api.nasa.gov/search?q=iss&media_type=image');
    this.getData(url);
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

  render() {
    const { errorFetching, searchData } = this.state;
    return (
      <ThemeProvider theme={globalTheme}>
        <StyledAppWrapper>
          <GlobalStyle />
          <Header getData={this.getData} />
          {searchData
            ? <Gallery searchData={searchData} getData={this.getData} />
            : <Loading error={errorFetching} />
          }
        </StyledAppWrapper>
      </ThemeProvider>
    );
  }
}

export default App;
