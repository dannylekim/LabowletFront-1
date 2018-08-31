import React, { PureComponent } from 'react';

import ReduxConnector from '../ReduxConnector';

import Slider from './common/Sliders';
import Switch from 'rc-switch';

import 'rc-switch/assets/index.css';

import '../../styles/create.scss';

const RoundType = [
  { round: 1, name: 'Round 1' },
  { round: 2, name: 'Round 2' },
  { round: 3, name: 'Round 3' },
]

class CreatePage extends PureComponent {
  constructor() {
    super();
    this.state = {
      name: '',
    }
  }

  _handleSubmit(e) {
    console.log(e);
  }

  handleNumberWords(value) {
    console.log(value);
  }

  handleTime(value) {
    console.log(value)
  }

  render() {
    const renderRoundList = RoundType.map((value) => (<li><span>{value.name}</span> <input type="checkbox" name={`round${value.round}`} /></li>))
    return (
      <div className="page create">
        <div className='navbar'>
          <div className="back-button" onClick={() => this.props.updatePage('HOME')}>Back</div>
          <h2>Create Room</h2>
        </div>

        <div className='page-container'>
          <form onSubmit={(e) => this._handleSubmit(e)}>
            <h3>Max number of words</h3>
            <Slider handleChange={(value) => this.handleNumberWords(value)} />
            <h3>Time limit</h3>
            <Slider handleChange={(value) => this.handleNumberWords(value)} />
            <hr />
            <div className="create-select-rounds">
              <span><h3>Allow skip:</h3><Switch className='can-skip-switch' /></span>
              <ul>
                {renderRoundList}
              </ul>
            </div>
            <button
              className='generic-button'
              type='submit'
            >
              Create
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const connectObject = {
  states: [],
  actions: [],
}

export default ReduxConnector(CreatePage, connectObject);