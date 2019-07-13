import {
  updatePage,
  loadTo,
  resetLoad,
} from './actions';
import { prod, dev} from '../../config/RESTurl.json';


const _updatePage = (newPage) => {
  return (dispatch) => dispatch(updatePage(newPage));
}

const _loadTo = (loadingProgress) => {
  return (dispatch) => dispatch(loadTo(loadingProgress));
}

const _resetLoad = () => {
  return (dispatch) => dispatch(resetLoad());
}

/**
 * Feature Toggles
 */


/** 1 - Toggle between dev/staging server */
const toggleServer = () => {
  return (dispatch, getState) => {
    const currentServer = getState().application.server.url;
    const action = {
      type: 'TOGGLE_SERVER',
    }
    if (currentServer === prod || currentServer === '') {
      return dispatch({
        ...action,
        newServer: dev,
        serverName: 'dev server',
      });
    }
    return dispatch({
      ...action,
      newServer: prod,
      serverName: 'prod server',
    });
  };
}


export default { 
  updatePage: _updatePage,
  loadTo: _loadTo,
  resetLoad: _resetLoad,
  toggleServer,
};