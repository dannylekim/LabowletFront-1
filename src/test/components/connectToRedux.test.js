import React from 'react'
import { expect } from 'chai';
import assert from 'assert';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';

// import React from 'react';
import { mount, render, shallow} from 'enzyme';
import connectToRedux from '../../../src/components/connectToRedux';

const mockStore = configureStore();

const myReducers = require('../../redux/rootReducer');

require('../testSetup.js');

const TempComponent = () => {
  return (
    <div>This is temp component</div>
  );
};

describe('HOC::connectToRedux', () => {
  describe('Structure', () => {
    it('should be a function', () => {
      expect(connectToRedux).to.be.an('function');
    })
  })

  describe('extension', () => {
    let component;

    beforeAll(() => {
      const ConnectedComponent = connectToRedux(TempComponent, { states: [] , actions: [] });
      console.log(myReducers);
      const wrapper = shallow(<ConnectedComponent store={mockStore({})} />)
      component = wrapper.dive();
    })

    it('should return object' , () => {
      console.log(component.props().store.getState());
      // const connectObject = connectToRedux(TempComponent, { states: [] , actions: [] });
      expect(component.props().store.getState().application).to.be.an('object');
    }) 
  });
});