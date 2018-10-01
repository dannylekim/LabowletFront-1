import React, { PureComponent } from 'react';

import connectToRedux from '../ReduxConnector';
import Modal from 'rmc-dialog';


import '../../styles/home.scss';
import 'rmc-dialog/assets/index.css';


const MAX_LENGTH_CODE = 4;

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      joinModalIsVisible: false,
      name: '',
    }
  }

  /**
   * Handles name change
   * @private
   * @param {Event} e 
   */
  _handleNameChange(name) {
    this.setState({ name });
  }


  /**
   * Handles modal visibility
   * @private
   */
  _handleJoinClick() {
    this.setState({ joinModalIsVisible: true })
  }

  /**
   * Function is called when user enter's name and navigates to either Create or Join page.
   * This will trigger redux function updateUserName and UpdatePage.
   * @param {String} page 
   */
  handleCreateClick() {
    try {
      if (this.state.name.length > 0) {
        this.props.updateUserName(this.state.name)
        this.props.updatePage('CREATE');
      } else {
        throw new Error('Must have a name')
      }
    } catch (err) {
      alert('Something went wrong..', err)
    }
  }

  _handleJoin(e) {
    const inputCode = e.target.value;
    if (inputCode.length === MAX_LENGTH_CODE && this.state.name.length > 0) {
      this.props.updateUserName(this.state.name);
      this.props.joinRoom(inputCode.toUpperCase()).catch((err) => {
        alert(`Error: ${err.message}`)
      })
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
          <input className="name-input" onChange={(e) => this._handleNameChange(e.target.value)} placeholder="Enter your name" />
          <div className='button-group'>
            <button
              className={`generic-button create-btn ${buttonClass}`}
              onClick={() => this.handleCreateClick()}
            >
              <p>Create</p>
            </button>
            <button
              className={`generic-button join-btn ${buttonClass}`}
              onClick={() => this._handleJoinClick()}
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