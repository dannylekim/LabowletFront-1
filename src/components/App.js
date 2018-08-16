import React, { Component } from 'react';

import HomePage from './visual/Home';
import BaseComponent from './BaseComponent';

class App extends BaseComponent {

  switchPages() {

  }
  render() {
    return (
      <div>
        <HomePage />
      </div>
    );
  }
}

export default App;