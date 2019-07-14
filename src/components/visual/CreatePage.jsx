import React, { PureComponent } from 'react';

import ReduxConnector from '../ReduxConnector';

import Slider from './common/Sliders';
import Switch from 'rc-switch';
import InputNumber from 'rc-input-number';
import Checkbox from 'rc-checkbox';

import 'rc-input-number/assets/index.css';
import 'rc-switch/assets/index.css';
import 'rc-checkbox/assets/index.css';

import '../../styles/create.scss';

const RoundType = [
  { round: 1, name: 'DESCRIBE IT', code: 'DESCRIBE_IT', value: true },
  { round: 2, name: 'ONE WORD DESCRIPTION', code: 'ONE_WORD_DESCRIPTION', value: false },
  { round: 3, name: 'ACT IT OUT', code: 'ACT_IT_OUT', value: false },
  { round: 4, name: 'SOUND IT OUT', code: 'SOUND_IT_OUT', value: false },
]

class CreatePage extends PureComponent {
  constructor() {
    super();
    this.state = {
      wordsPerPerson: 2,
      maxTeams: 2,
      roundTimeInSeconds: 10,
      allowSkips: false,
      rounds: RoundType,
    }
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.createRoom(this.state).catch(err => {
      alert(`Error: ${err.message}`)
    });
  }
  
  handleNumberOfTeam(maxTeams) {
    this.setState({ maxTeams });
  }

  handleNumberOfWords(wordsPerPerson) {
    this.setState({ wordsPerPerson });
  }

  handleSkippable(allowSkips) {
    this.setState({ allowSkips });
  }

  handleTime(roundTimeInSeconds) {
    this.setState({ roundTimeInSeconds });
  }

  handleRoundToggle(e, index) {
    const rounds = [...this.state.rounds];
    rounds[index - 1].value = e.target.checked;
    this.setState({ rounds });
  }

  render() {
    const renderRoundList = [...this.state.rounds].map((value, i) => {
      return (<li key={`round${value.round}`}>
        <span>{value.name}</span>
        <Checkbox
          className="round-checkbox"
          onChange={(e) => this.handleRoundToggle(e, value.round)}
          name={`round${value.round}`}
          checked={value.value}/>
      </li>)
    });
    return (
      <div className="create">
        <div className='page-container'>
          <div className='card'>
          <form onSubmit={(e) => this._handleSubmit(e)}>
            <span><h3>Max Teams </h3><h2>{this.state.maxTeams}</h2></span>
            <Slider
              handleChange={(value) => this.handleNumberOfTeam(value)} 
              min={2}
              max={6}
              default={2}
              name="maxTeams"
            />
            <h3>Max number of words {this.state.wordsPerPerson}</h3>
            <Slider
              handleChange={(value) => this.handleNumberOfWords(value)}
              min={1}
              max={5}
              default={2}
              name="wordsPerPerson"
            />
            <h3>Max time per round</h3>
            <InputNumber
              min={10}
              step={10}
              max={200}
              defaultValue={this.state.roundTimeInSeconds}
              style={{
                width:100,
              }}
              required
            />
            <hr />
            <span style={{ textAlign: 'center'}}>
              <h3>Allow skip:</h3>
              <Switch
                className='can-skip-switch'
                onChange={(e) => this.handleSkippable(e)}
                defaultChecked={false}
              />
            </span>
            <div className="create-select-rounds">
              <ol>
                {renderRoundList}
              </ol>
            </div>
            <button
              className={`generic-button`}
              type='submit'
            >
              <p>Create</p>
            </button>
          </form>
          </div>
        </div>
      </div>
    );
  }
}

const connectObject = {
  states: [],
  actions: ['createRoom'],
}

export default ReduxConnector(CreatePage, connectObject);