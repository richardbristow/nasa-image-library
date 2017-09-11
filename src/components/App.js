import React, { Component } from 'react';
import '../styles/css/App.css';

import SearchBar from './SearchBar';
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Nasa Image Library</h2>
          <SearchBar onSearch={this.handleSearch} />
        </div>
      </div>
    );
  }
}

export default App;
