import React from 'react'
import { expect } from 'chai';
import assert from 'assert';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';

// import React from 'react';
import { mount, shallow} from 'enzyme';
import connectToRedux from '../../components/ReduxConnector';

const mockStore = configureStore();

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
      const wrapper = shallow(<ConnectedComponent store={mockStore({})} />)
      component = wrapper.dive().instance();
    })

    it('should return object' , () => {
      expect(component.props.store.getState()).to.be.an('object');
    }) 
  });

});