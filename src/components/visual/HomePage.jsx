import React, { PureComponent } from 'react';
import Swal from 'sweetalert2'
import * as Sentry from '@sentry/browser';

import connectToRedux from '../ReduxConnector';

import '../../styles/home.scss';


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
  _handleJoinClick = () => {
    return Swal.fire({
      title: 'Enter room code',
      input: 'text',
      preConfirm: this._handleJoin,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }    
        if (value.length !== MAX_LENGTH_CODE) {
          return 'Code should be only 4 characters'
        } 
        if (this.state.name.length === 0) {
          return 'You must have a name!'
        }
      }
    })
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
      Sentry.captureException(err);
      Swal.fire({
        type:'error',
        title: 'Something went wrong..',
        text: err.message
      });
    }
  }

  _handleJoin = (inputCode) => {
      this.props.updateUserName(this.state.name);
      this.props.joinRoom(inputCode.toUpperCase())
      .catch((err) => {
        Sentry.captureException(err);
        Swal.fire({
          type:'error',
          title: 'woops!',
          text: err.message
        });
      });
    // }
  }

  render() {
    const hasName = this.state.name !== '';
    return (
      <div className="home">
        <div className="page-container">
          <input className="name-input" onChange={(e) => this._handleNameChange(e.target.value)} placeholder="Enter your name" />
          {hasName && 
            <div className='button-group'>
                <button
                  className={`generic-button create-btn`}
                  onClick={() => this.handleCreateClick()}
                >
                  <p>Create</p>
                </button>
                <button
                  className={`generic-button join-btn`}
                  onClick={() => this._handleJoinClick()}
                >
                  <p>Join</p>
                </button>
            </div>
          }
        </div>
      </div>
    );
  }
}

const connectObject = {
  states: [],
  actions: ['updateUserName', 'joinRoom'],
}

export default connectToRedux(Home, connectObject);