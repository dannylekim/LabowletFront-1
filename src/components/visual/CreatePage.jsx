  import React, { PureComponent }  from 'react';

  import ReduxConnector from '../ReduxConnector';
  import Slider from 'rc-slider';
  import 'rc-slider/assets/index.css';

  import '../../styles/create.scss';

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

    render() {
      return (
        <div className="page create">
          <div className='navbar'>
            <h2>Create Room</h2>
          </div>

          <div className='page-container'>
            <form onSubmit={(e) => this._handleSubmit(e)}>
              <h3>Max number of words</h3>
              <Slider 
                min={2}
                max={6}
                defaultValue={3}
                marks={1}
              />
              <h3>Time limit</h3><input type="time" name="time"/>
              <h3>Allow skip:</h3><input type="checkbox" name="skippable"/>
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