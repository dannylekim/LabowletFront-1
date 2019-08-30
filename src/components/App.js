import React, {PureComponent} from 'react';
import Switch from 'rc-switch';

import HomePage from './visual/HomePage';
import CreatePage from './visual/CreatePage';
import LobbyPage from './visual/LobbyPage';
import BowlPage from './visual/BowlPage';
import GamePage from './visual/GamePage';
import ScorePage from './visual/ScorePage';
import WelcomePage from './visual/WelcomePage';

import connectToRedux from './ReduxConnector';

import '../styles/index.scss';
import 'rc-switch/assets/index.css';

import Icon from "./visual/common/Icon";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      prompt: null,
    }
    
    if (this.props.application.debugMode) {
      this.props.toggleServer();
      this.props.toggleServer();
    }
  
    // check if token exists in  localstorage.
    // retrieve if it does and immediately test it to see if it's active, otherwise kill it.
    // const token = localStorage.getItem('labowless_token');
    // if (localStorage.getItem('labowless_token')) {
    //   this.props.reconnect(token)
    // }  else {
    //   setTimeout(() => {
    //     this.props.updatePage('HOME');
    //   },2500);
    // }


    window.addEventListener('appinstalled', (evt) => {
      console.log('labowless already install');
    });

    window.addEventListener('beforeinstallprompt', (e) => {
      // Stash the event so it can be triggered later.
      this.setState({
        prompt: e
      });
      alert('can install!');
    });
  }

  manuallyLeave = () => {
    try {
      // remove user from room.
      this.props.leaveRoom();

      // remove localstoarage
      localStorage.removeItem('labowless_token');
    } catch (err) {
      console.error('Uh oh houston, we have a prpblem while disconnect -> ', err.message);
    } finally {
      this.props.updatePage('HOME');
    }
  }

  switchPages(pageKey) {
    switch(pageKey) {
      case 'HOME':
        return {
          title: 'Labowless',
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
      case 'SCOREBOARD':
        return {
          title: 'GAME OVER',
          component: <ScorePage />
        };
      default:
        return {
          component: (
            <WelcomePage
              id={localStorage.getItem('labowless_token')}
              leave={() => this.manuallyLeave()}
            />
          ),
        };
    }
  }
  render() {
    const PageToRender = this.switchPages(this.props.application.page)
    return (
      <div className="page">
      {this.props.application.page !== '' && <div className='navbar' style={{ display: 'flex'}}>
        {this.props.application.page === 'CREATE' || this.props.application.page === 'LOBBY' ?
            <div className="back-button" onClick={() => this.manuallyLeave()}>
              <i className="fas fa-chevron-left fa-2x"/></div> : ''}
        <h2>{PageToRender.title}</h2>
          {this.props.application.debugMode && <span><Switch
            className='can-skip-switch'
            onChange={(e) => this.props.toggleServer()}
          />
          <p style={{ color: '#fff'}}>{this.props.application.server.label}</p>
          </span>}
        {this.props.application.page !== 'HOME' && <div className="flex-icon-username">
          <p style={{color: '#fff', marginRight: `10px`}}>
            {this.props.user.name}
          </p>
          <Icon size={`40px`} fill={'#fff'} iconId={this.props.user.uniqueIconReference}/>
        </div>}
      </div>}
        {PageToRender.component}
      </div>
    );
  }
}

const connectObject = {
  states: ['user'],
  actions: ['leaveRoom','reconnect'],
} 

export default connectToRedux(App, connectObject);