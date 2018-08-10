import React, { Component } from 'react';
import '../styles/index.scss';
import 'wired-elements';


class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <wired-input placeholder="Enter name"></wired-input>
        <wired-button >Submit</wired-button>
      </div>
    );
  }
}

export default App;