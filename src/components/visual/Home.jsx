import React from 'react';

import BaseComponent from '../BaseComponent';
import '../../styles/home.scss';
class Home extends BaseComponent {
  constructor() {
    super();
    this.state = {
      name: '',
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

  render() {
    const buttonClass = this.state.name !== '' ? 'visible' : 'invisible';
    return (
      <div className="page home">
        <div className='navbar'>
          <h2>Labowlet</h2>
        </div>
        <input className="name-input" onChange={(e) => this._handleNameChange(e)} placeholder="Enter your name" />

        <div className='button-group'>
          <button
            className={`generic-button create-btn ${buttonClass}`}
            onClick={() => this.navigateTo('CREATE')}
          >
            <p>Create</p>
          </button>
          <button
            className={`generic-button join-btn ${buttonClass}`}
            onClick={() => this.navigateTo('JOIN')}
          >
            <p>Join</p>
          </button>
        </div>
      </div>
    );
  }
}

export default Home;