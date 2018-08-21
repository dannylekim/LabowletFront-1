import React, { PureComponent } from 'react';

import HomePage from './visual/Home';
import connectToRedux from './connectToRedux';

class App extends PureComponent {


  switchPages() {

  }
  render() {
    return (
      <div>
        <HomePage {...this.props}/>
      </div>
    );
  }
}

const connectObject = {
  states: [],
  actions: [],
}


export default connectToRedux(App, connectObject);