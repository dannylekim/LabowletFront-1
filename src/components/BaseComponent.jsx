import React, { Component } from 'react';
import '../styles/index.scss';
import 'wired-elements';


class BaseComponent extends Component {

  /**
   * Update page state
   * @param {String} page 
   */
  navigateTo(page) {
    console.log('BaseComponent::', page)
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

export default BaseComponent;