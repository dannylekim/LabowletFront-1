import React, { PureComponent } from 'react';

import connectToRedux from '../ReduxConnector';
import '../../styles/room.scss';

import TeamCard from './common/TeamCard'; 

const TempArr = [
  { 
    teamates: ['hello', 'wow']
  },
  { 
    teamates: ['bye', 'cool']
  },
  { 
    teamates: ['fasss']
  },
]

class RoomPage extends PureComponent {

  /**
   * Handles name change
   * @private
   * @param {Event} e 
   */
  handleClick(teamIndex) {
    console.log('Join Team!!', teamIndex)
  }


  render() {
    const Teams = TempArr.map((value, index) => <TeamCard team={index+1} teamates={value.teamates} handleClick={() => this.handleClick(index + 1)}/>);
    return (
      <div className="page home">
        <div className='navbar'>
          <h2>Labowlet</h2>
        </div>
        <div className="page-container">
          {Teams}
        </div>
      </div>
    );
  }
}

const connectObject = {
  states: [],
  actions: ['updateUserName'],
}

export default connectToRedux(RoomPage, connectObject);