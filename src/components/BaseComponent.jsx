import React, { Component } from 'react';
import { connect } from 'react-redux';

import application from '../redux/application';

import '../styles/index.scss';
import 'wired-elements';

const mapState = (state) => {
  return {
    application: state.application,
  }
};

const mapDispatch = (dispatch) => {
  return {
    updatePage: (newPage) => dispatch(application.updatePage(newPage)),
  };
};

class BaseComponent extends Component {

  /**
   * Update page state
   * @param {String} page 
   */
  navigateTo(page) {
    console.log('BaseComponent::', page)
    this.props.updatePage(page);
    // TODO
  }

  /**
   * Start loading state
   */
  startLoading() {
    // TODO
    // loading state = true
  }

  /**
   * Stop loading state
   */
  stopLoading() {
    //TODO
  }
}

export default connect(mapState, mapDispatch)(BaseComponent);