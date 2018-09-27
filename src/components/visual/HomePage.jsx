import React, { PureComponent } from 'react';

import connectToRedux from '../ReduxConnector';
import Modal from 'rmc-dialog';


import '../../styles/home.scss';
import 'rmc-dialog/assets/index.css';




class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      joinModalIsVisible: false,
      name: 'no name person',
    }
  }

  /**
   * Handles name change
   * @private
   * @param {Event} e 
   */
  _handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  /**
   * Function is called when user enter's name and navigates to either Create or Join page.
   * This will trigger redux function updateUserName and UpdatePage.
   * @param {String} page 
   */
  handleCreateClick() {
    try {
      this.props.updateUserName(this.state.name);
      this.props.updatePage('CREATE');
    } catch (err) {
      alert('Something went wrong..', err)
    }
  }

  /**
   * Handles modal visibility
   * @private
   */
  _handleJoinClick() {
    this.setState({ joinModalIsVisible : true })
  }

  _handleJoin(e) {
    try {
      const inputCode = e.target.value;
      if (inputCode.length === 4) {
        this.props.updateUserName(this.state.name);
        this.props.joinRoom(inputCode.toUpperCase())
      }
    } catch (err) {
      alert('Something went wrong..', err)
    }

  }

  render() {
    const buttonClass = this.state.name !== '' ? 'visible' : 'invisible';
    return (
      <div className="page home">
        <div className='navbar'>
          <h2>Labowlet</h2>
        </div>
        <div className="page-container">
          <input className="name-input" onChange={(e) => this._handleNameChange(e)} placeholder="Enter your name" />
          <div className='button-group'>
            <button
              className={`generic-button create-btn ${buttonClass}`}
              onClick={() => this.handleCreateClick()}
            >
              <p>Create</p>
            </button>
            <button
              className={`generic-button join-btn ${buttonClass}`}
              onClick={() => this.handleJoinClick()}
            >
              <p>Join</p>
            </button>
          </div>
        </div>
        <Modal
          title='Enter Room Code'
          style={{              
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            top: '30vh',
          }}
          visible={this.state.joinModalIsVisible}
          animation="zoom"
          maskAnimation="fade"
          maskClosable={true}
          onClose={() => {
            this.setState({
              joinModalIsVisible: false,
            });
          }}
        >
          <input 
            className="code-input"
            onChange={(e) => this._handleJoin(e)}
            placeholder="Enter your name"
            maxLength="4"
          />
        </Modal>
      </div>
    );
  }
}

const connectObject = {
  states: [],
  actions: ['updateUserName', 'joinRoom'],
}

export default connectToRedux(Home, connectObject);