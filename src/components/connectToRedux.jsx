
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import actionDispatchers from '../redux/actionDispatchers';

/**
 * HoC that wraps Application actions + whatever actions you need.
 * @param {ReactNode} ComposedComponent 
 * @param {Object} connectObject
 * @param {Object} connectObject.states - Array of states to map
 * @param {Object} connectObject.actions - Array of actions to map
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
    },
      {
        //Default all components have to extend this
        'application': state['application'],
      }
    );
  };

  /**
   * Iterate through passed actions and map the action to Component to be returned
   * @return Object with at LEAST the applicaiton actions
   */
  const mapActions = () => {
    return Object.assign(
      (connectObject.actions || []).reduce((acc, item) => acc[item] = actionDispatchers[item], {}),
      ...actionDispatchers.applicationActions
    )
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
