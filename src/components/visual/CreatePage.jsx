import React, { PureComponent } from 'react';

import ReduxConnector from '../ReduxConnector';

import Slider from './common/Sliders';
import Switch from 'rc-switch';
import InputNumber from 'rc-input-number';
import Checkbox from 'rc-checkbox';
import InputButton from './common/InputButton';

import 'rc-input-number/assets/index.css';
import 'rc-switch/assets/index.css';
import 'rc-checkbox/assets/index.css';

import '../../styles/create.scss';

const RoundType = [
  { round: 1, name: 'DESCRIBE IT', value: false },
  { round: 2, name: 'ONE WORD DESCRIPTION', value: false },
  { round: 3, name: 'ACT IT OUT', value: false },
  { round: 4, name: 'SOUND IT OUT', value: false },
]

class CreatePage extends PureComponent {
  constructor() {
    super();
    this.state = {
      numberOfWords: 2,
      numberOfTeams: 2,
      timeOfGame: 30,
      skippable: false,
      rounds: RoundType,
    }
  }

  _handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    //this.props.updateSetting();
  }
  
  handleNumberOfTeam(numberOfTeams) {
    this.setState({ numberOfTeams });
  }

  handleNumberOfWords(numberOfWords) {
    this.setState({ numberOfWords });
  }

  handleSkippable(skippable) {
    this.setState({ skippable });
  }

  handleTime(timeOfGame) {
    this.setState({ timeOfGame });
  }

  handleRoundToggle(e, index) {
    const rounds = [...this.state.rounds];
    rounds[index - 1].value = e.target.checked;
    this.setState({ rounds });
    console.log(this.state.rounds);
  }

  render() {
    const renderRoundList = [...this.state.rounds].map((value) => {
      return (<li>
        <span>{value.name}</span> <Checkbox key={`round${value.round}`} className="round-checkbox" onChange={(e) => this.handleRoundToggle(e, value.round)} name={`round${value.round}`} checked={value.value}/>
      </li>)
    });
    return (
      <div className="page create">
        <div className='navbar'>
          <div className="back-button" onClick={() => this.props.updatePage('HOME')}>Back</div>
          <h2>Create Room</h2>
        </div>

        <div className='page-container'>
          <div className='card'>
          <form onSubmit={(e) => this._handleSubmit(e)}>
            <span><h3>Max Teams </h3><h2>{this.state.numberOfTeams}</h2></span>
            <Slider
              handleChange={(value) => this.handleNumberOfTeam(value)} 
              min={2}
              max={6}
              default={2}
              name="numberOfTeams"
            />
            <h3>Max number of words {this.state.numberOfWords}</h3>
            <Slider
              handleChange={(value) => this.handleNumberOfWords(value)}
              min={1}
              max={5}
              default={2}
              name="numberOfWords"
            />
            <h3>Max time per round</h3>
            <InputNumber
              min={10}
              step={10}
              max={200}
              style={{
                width:100,
              }}
              required
              // placeholder='wtf'
              // downHandler={{
              //   left: '0'
              // }}
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
            {this.state.timeOfGame ? <button
              className={`generic-button`}
              type='submit'
            >
              <p>Create</p>
            </button> : ''}
          </form>
          </div>
        </div>
      </div>
    );
  }
}

const connectObject = {
  states: [],
  actions: ['updateSetting'],
}

export default ReduxConnector(CreatePage, connectObject);