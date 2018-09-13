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
    it('should be a function', () => {
      expect(CreatePage).to.be.an('function');
    })
  })

  describe('props', () => {
    let component;
    let instance;

    beforeAll(() => {
      const wrapper = shallow(<CreatePage store={mockStore({})} />)
      component = wrapper.dive().dive();
      instance = component.instance();
    })

    it('should have createRoom function' , () => {
      expect(instance.props.createRoom).to.be.an('function');
    }) 
  });

  describe('Component functions', () => {
    let component;

    beforeAll(() => {
      // const CreateComponent = <CreatePage store={mockStore({})} />
      const wrapper = shallow(<CreatePage store={mockStore({})} />)
      component = wrapper.dive().dive();
    })

    afterAll(() => {
      component = '';
    });

    it('should update maxTeams state' , () => {
      component.instance().handleNumberOfTeam(3)
      expect(component.state('maxTeams')).to.equal(3);
    }) 

    it('should update wordsPerPerson state' , () => {
      component.instance().handleNumberOfWords(3)
      expect(component.state('wordsPerPerson')).to.equal(3);
    }) 

    it('should update allowSkips state' , () => {
      component.instance().handleSkippable(true)
      expect(component.state('allowSkips')).to.be.true;
    }) 

    it('should update roundTimeInSeconds state' , () => {
      component.instance().handleTime(30)
      expect(component.state('roundTimeInSeconds')).to.equal(30);
    }) 
  });
});