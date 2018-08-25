  import React from 'react';

  import BaseComponent from '../BaseComponent';
  import '../../styles/create.scss';

  class Create extends BaseComponent {
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

          <div className=''>
            <form onSubmit={(e) => this._handleSubmit(e)}>
              <h3>Max number of words</h3><input name="words"/>
              <h3>Time limit</h3><input name="time"/>
              <h3>Allow skip:</h3><input name="skippable"/>
              <button type='submit'>Create</button>
            </form>
          </div>
        </div>
      );
    }
  }

  export default Create;