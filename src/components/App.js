import React, { PureComponent } from 'react';

import HomePage from './visual/HomePage';
import CreatePage from './visual/CreatePage';
import LobbyPage from './visual/LobbyPage';
import BowlPage from './visual/BowlPage';
import GamePage from './visual/GamePage';

import ReduxConnector from './ReduxConnector';

import '../styles/index.scss';

class App extends PureComponent {

  switchPages(pageKey) {
    switch(pageKey) {
      case 'HOME':
        return {
          title: 'Labowlet',
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
      case 'BOWL':
        return {
          title: 'Bowl',
          component: <BowlPage />
        };
      case 'GAME':
        return {
          title: 'Game Time',
          component: <GamePage />
        };
      default:
        return null;
    }
  }
  render() {
    const PageToRender = this.switchPages(this.props.application.page)
    return (
      <div className="page">
      <div className='navbar'>
        {this.props.application.page === 'LOBBY' || this.props.application.page === 'CREATE' ?
         <div className="back-button" onClick={() => this.props.updatePage('HOME')}>Back</div>: ''}
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