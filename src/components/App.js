import React, { PureComponent } from 'react';

import HomePage from './visual/HomePage';
import CreatePage from './visual/CreatePage';
import LobbyPage from './visual/LobbyPage';

import ReduxConnector from './ReduxConnector';

import '../styles/index.scss';

class App extends PureComponent {

  switchPages(pageKey) {
    switch(pageKey) {
      case 'HOME':
        return {
          title: 'Labowlet a',
          component: <HomePage />
        };
      case 'CREATE':
        return {
          title: 'Create Page',
          component: <CreatePage />
        };
      case 'LOBBY':
        return {
          title: 'Lobby',
          component: <LobbyPage />
        };
      default:
        return null;
    }
  }
  render() {
    const PageToRender = this.switchPages(this.props.application.page)
    return (
      <div className="page home">
      <div className='navbar'>
        <h2>{PageToRender.title}</h2>
      </div>
        {PageToRender.component}
      </div>
    );
  }
}

const connectObject = {
  states: [],
  actions: [],
} 

export default ReduxConnector(App, connectObject);