import React from 'react'
import { expect } from 'chai';
import assert from 'assert';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';

// import React from 'react';
import { mount, render, shallow} from 'enzyme';
import connectToRedux from '../../components/ReduxConnector';
import CreatePage from '../../components/visual/CreatePage';

const mockStore = configureStore();

const myReducers = require('../../redux/rootReducer');

require('../testSetup.js');


describe('CreatePage', () => {
  describe('Structure', () => {
    it('should be a class', () => {
      expect(connectToRedux).to.be.an('class');
    })
  })

  describe('extension', () => {
    let component;

    beforeAll(() => {
      const wrapper = shallow(<CreatePage store={mockStore({})} />)
      component = wrapper.dive();
    })

    it('should return object' , () => {
      console.log(component.props().store.getState());
      // const connectObject = connectToRedux(TempComponent, { states: [] , actions: [] });
      expect(component.props().store.getState().application).to.be.an('object');
    }) 
  });
});