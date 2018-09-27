import React from 'react'
import { expect } from 'chai';
import assert from 'assert';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';

import { mount, render, shallow} from 'enzyme';
import connectToRedux from '../../components/ReduxConnector';
import HomePage from '../../components/visual/HomePage';

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

    beforeAll(() => {
      const wrapper = shallow(<HomePage store={mockStore({})} />)
      component = wrapper.dive().dive();
    })

    afterAll(() => {
      component = '';
    });

    it('should update joinModalIsVisible state' , () => {
      component.instance()._handleJoinClick()
      expect(component.state('joinModalIsVisible')).to.be.true;
    }) 

    it('should update name state' , () => {
      console.log(typeof component.instance()._handleNumberOfWords);
      component.instance()._handleNumberOfWords('foo')
      expect(component.state('name')).to.equal('foo');
    }) 

    it('should handleCreateClick call updateUserName prop' , () => {
      const props = sinon.spy()
      component.instance().handleCreateClick()
      expect(props.updateUserName).toHaveBeenCalled();
    }) 
  });
});