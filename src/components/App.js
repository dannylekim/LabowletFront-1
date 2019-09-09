import React, { useState, useEffect } from 'react';
import Switch from 'rc-switch';
import { useTransition, animated } from 'react-spring';

import HomePage from './visual/HomePage';
import CreatePage from './visual/CreatePage';
import LobbyPage from './visual/LobbyPage';
import BowlPage from './visual/BowlPage';
import GamePage from './visual/GamePage';
import ScorePage from './visual/ScorePage';
import WelcomePage from './visual/WelcomePage';
import SummaryPage from './visual/SummaryPage';

import connectToRedux from './ReduxConnector';
import logoImg from '../assets/images/labowless-logo.png';
import '../styles/index.scss';
import 'rc-switch/assets/index.css';

import Icon from './visual/common/Icon';
import { styles } from 'ansi-colors';

const App = props => {
  const [prompt, setPrompt] = useState(null);

  useEffect(() => {
    if (props.application.debugMode && props.application.server.url.length === 0) {
      props.toggleServer();
      props.toggleServer();
    }
  });

  const manuallyLeave = () => {
    try {
      // remove user from room.
      props.leaveRoom();

      // remove localstoarage
      localStorage.removeItem('labowless_token');
    } catch (err) {
      console.error(
        'Uh oh houston, we have a prpblem while disconnect -> ',
        err.message,
      );
    } finally {
      props.updatePage('HOME');
    }
  };

  const switchPages = (pageKey) => {
    switch (pageKey) {
      case 'HOME':
        return {
          title: <img className="navbar_logo" src={logoImg} alt="logo"/>,
          component: <HomePage />
        };
      case 'CREATE':
        return {
          title: 'Create Page',
          component: <CreatePage />,
        };
      case 'LOBBY':
        return {
          title: 'Lobby',
          component: <LobbyPage />,
        };
      case 'BOWL':
        return {
          title: 'Bowl',
          component: <BowlPage />,
        };
      case 'GAME':
        return {
          title: 'Game Time',
          component: <GamePage />,
        };
      case 'SCOREBOARD':
        return {
          title: 'GAME OVER',
          component: <ScorePage />,
        };
      case 'SUMMARY':
        return {
          title: 'SUMMARY',
          component: <SummaryPage />,
        };
      default:
        return {
          component: (
            <WelcomePage
              id={localStorage.getItem('labowless_token')}
              leave={() => manuallyLeave()}
            />
          ),
        };
    }
  };
  
  const PageToRender = switchPages(props.application.page);
  
  const transitions_slides = useTransition(props.application.page, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)', position: 'relative' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)', position: 'absolute' },
    trail: 100
  });
  const transitions_swing = useTransition(props.application.page, p => p, {
    from: { opacity: 0, transform: 'rotateY(100deg)', transformOrigin: 'left' },
    enter: { opacity: 1, transform: 'rotateY(0)', transformOrigin: 'left' },
    leave: { opacity: 0, transform: 'rotateY(-100deg)', transformOrigin: 'right', position: 'absolute' },
  });

  const transitions = transitions_swing;
  return (
    <div className="page">
      {props.application.page !== '' && (
        <div>
          <div className="navbar" style={{ display: 'flex' }}>
            {props.application.page === 'CREATE' ||
            props.application.page === 'LOBBY' ? (
              <div className="back-button" onClick={() => manuallyLeave()}>
                <Icon iconId={100} size={35} fill={`#fff`} />
              </div>
            ) : (
              ''
            )}
            <h2>{PageToRender.title}</h2>
            {props.application.debugMode && (
              <span>
                <Switch
                  className="can-skip-switch"
                  onChange={props.toggleServer}
                />
                <p style={{ color: '#fff' }}>
                  {props.application.server.label}
                </p>
              </span>
            )}
            {props.application.page !== 'HOME' && (
              <div className="flex-icon-username">
                <p style={{ color: '#fff', marginRight: `10px` }}>
                  {props.user.name}
                </p>
                <Icon
                  size={`40px`}
                  fill={'#fff'}
                  iconId={props.user.uniqueIconReference}
                />
              </div>
            )}
          </div>
        </div>
      )}
      <div>
        {transitions.map(({ item, props }) => {
          const { component } = switchPages(item);
          return <animated.div style={{ ...props }}>{component}</animated.div>;
        })}
      </div>
    </div>
  );
};

const connectObject = {
  states: ['user'],
  actions: ['leaveRoom', 'reconnect'],
};

export default connectToRedux(App, connectObject);
