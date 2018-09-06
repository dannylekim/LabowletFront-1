import React, { PureComponent } from 'react';

import HomePage from './visual/HomePage';
import CreatePage from './visual/CreatePage';
import JoinPage from './visual/JoinPage';

import ReduxConnector from './ReduxConnector';

import '../styles/index.scss';

class App extends PureComponent {

  switchPages(pageKey) {
    switch(pageKey) {
      case 'HOME':
        return <HomePage />;
      case 'CREATE':
        return <CreatePage />;
      case 'JOIN':
        return <JoinPage/>;
      default:
        return null;
    }
  }
  render() {
    const PageToRender = this.switchPages(this.props.application.page)
    return (
      <div>
        {PageToRender}
      </div>
    );
  }
}

const connectObject = {
  states: [],
  actions: [],
} 

export default ReduxConnector(App, connectObject);