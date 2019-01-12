import React from 'react'
import { expect } from 'chai';
import assert from 'assert';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';

import { mount, render, shallow} from 'enzyme';
import connectToRedux from '../../components/ReduxConnector';
import HomePage from '../../components/visual/HomePage';

/**
 * import actions
 */
import * as actions from '../../redux/actionDispatchers'

import * as userActions from '../../redux/user/actions';
import * as userActionTypes from '../../redux/user/actionTypes';

const mockStore = configureStore();

const myReducers = require('../../redux/rootReducer');

require('../testSetup');


describe('HomePage', () => {
  describe('Structure', () => {
    it('should be a function', () => {
      expect(HomePage).to.be.an('function');
    })
  })

  describe('props', () => {
    let component;
    let instance;

    beforeAll(() => {
      const wrapper = shallow(<HomePage store={mockStore({})} />)
      component = wrapper.dive().dive();
      instance = component.instance();
    })

    it('should have updateUserName function' , () => {
      expect(instance.props.updateUserName).to.be.an('function');
    }) 

    it('should have joinRoom function' , () => {
      expect(instance.props.joinRoom).to.be.an('function');
    }) 
  });

  describe('Component functions', () => {
    let component;
    const props = {};

    beforeAll(() => {
      const wrapper = shallow(<HomePage store={mockStore({})} />)
      component = wrapper.dive().dive();

      props.updateUserName = sinon.spy();
      props.joinRoom = sinon.spy();
      props.updatePage = sinon.spy();
    })

    afterAll(() => {
      component = '';
    });

    it('should update joinModalIsVisible state' , () => {
      component.instance()._handleJoinClick()
      expect(component.state('joinModalIsVisible')).to.be.true;
    }) 

    it('should update name state' , () => {
      component.instance()._handleNameChange('foo')
      expect(component.state('name')).to.equal('foo');
    })

    it('should expect join to udpate store' , () => {
      component.instance()._handleNameChange('foo')
      expect(component.state('name')).to.equal('foo');
    })
  });

  describe('Redux functions', () => {

    it('should update user name', () => {
      const name = 'john doe';
      const expectedAction = {
        type: userActionTypes.default.UPDATE_USER_NAME,
        name,
      }
      expect(userActions.updateUserName(name)).to.deep.equal(expectedAction)
    });
  });
});