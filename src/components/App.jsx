import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components/macro';

import '../polyfills';
import getData from '../utils/getData';
import { GlobalStyle, globalTheme } from '../theme/globalStyle';

import Header from './header/Header';
import Gallery from './gallery/Gallery';
import Loading from './shared/Loading';
import NoRoute from './shared/NoRoute';

const StyledApp = styled.div`
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
    this.handleSearch(encodeURI(url));
  }

  async handleSearch(url, event) {
    if (event) { event.preventDefault(); }
    const { errorFetching, data } = await getData(url);
    this.setState({ errorFetching, searchData: data });
    window.scrollTo(0, 0);
  }

  render() {
    const { errorFetching, searchData } = this.state;
    return (
      <ThemeProvider theme={globalTheme}>
        <Fragment>
          <GlobalStyle />
          <Router>
            <StyledApp>
              <Header handleSearch={this.handleSearch} />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/search" />}
                />
                <Route
                  path="/search"
                  render={props => (
                    searchData
                      ? (
                        <Gallery
                          searchData={searchData}
                          handlePageChange={this.handleSearch}
                          {...props}
                        />
                      )
                      : <Loading error={errorFetching} />
                  )}
                />
                <Route component={NoRoute} />
              </Switch>
            </StyledApp>
          </Router>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
