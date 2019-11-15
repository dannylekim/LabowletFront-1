
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import actionDispatchers from '../redux/actionDispatchers';

/**
 * HoC that wraps Component with any redux state and actions you need.
 * This will save effort of adding redux to a selected components.
 * @param {ReactNode} ComposedComponent 
 * @param {Object} connectObject
 * @param {Object} connectObject.states - Array of states to map
 * @param {Object} connectObject.actions - Array of actions to map
 *
 * @example 
 *
 * // states and actionsDispatchers are imported via names for simplicity
 * const connectObject = {
 *   states: ['user', 'room'],
 *   actions: ['leaveRoom', 'reconnect'], 
 * };
 *
 * export default connectToRedux(App, connectObject);
 */
export default function (ComposedComponent, connectObject) {

  /**
   * Iterate through passed states and map the state to Component to be returned
   * @param {state} state 
   */
  const mapStatetoProps = (state) => {
    return (connectObject.states || []).reduce((acc, item) => {
      acc[item] = state[item];
      return acc;
    },{
        'application': state['application'],// Default all components have to extend this
      });
  };

  /**
   * Iterate through passed actions and map the action to Component to be returned
   * @return Object with at LEAST the application actions
   */
  const mapActions = () => {
    return (connectObject.actions || []).reduce((acc, item) => {
      acc[item] = actionDispatchers[item]
      return acc;
    }, { 
      updatePage: actionDispatchers.updatePage,
      toggleServer: actionDispatchers.toggleServer, 
      toggleFeature: actionDispatchers.toggleFeature, 
    });
  };

  class ReduxContainer extends React.PureComponent {
    constructor(props) {
      super(props)
      const { dispatch } = props
      this.boundActionCreators = bindActionCreators(mapActions(), dispatch)
    }
    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.boundActionCreators}
        />
      )
    }
  }

  ReduxContainer.propTypes = {
    dispatch: PropTypes.func
  }
  ReduxContainer.defaultProps = {
    dispatch: () => { }
  }
  return connect(mapStatetoProps)(ReduxContainer);
}
