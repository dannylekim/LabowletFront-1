import url from '../config/RESTurl.json';
const axios = require('axios');
const REST_URL = url.prod;

/**
 * 
 * @param {Object} roomSetting 
 * @param {String} TokenId 
 * @param {Function} loading
 */
async function createRoom(roomSetting, TokenId, loading, server) {
  try {
    const headers = { 
      'X-Auth-Token': TokenId,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };
    const response = await axios({
      method: 'POST',
      url: '/rooms',
      baseURL: `${server || REST_URL}`,
      headers,
      onDownloadProgress: function (progressEvent) {
        loading(progressEvent)
      },
      data: roomSetting,
    });
    if (response.status >= 300 && response.status < 200) {
      throw new Error(`Error ${response.status} creating new Room:`, response.statusText);
    }

    return response;
  } catch (error) {
    //console.error('RoomHTTPRequests::createRoom:', error);
    return error;
  }
}

/**
 * @async
 * @param {String} roomCode
 * @param {String} TokenId
 * @param {Function} loading
 */
async function joinRoom(roomCode, TokenId, loading, server) {
  try {
    const headers = { 
      'X-Auth-Token': TokenId,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };
    const response = await axios({
      method: 'PUT',
      url: '/rooms',
      baseURL: `${server || REST_URL}`,
      headers,
      data: roomCode,
      onDownloadProgress: function (progressEvent) {
        loading(progressEvent)
      },
    });

    return response;
  } catch (error) {
    return { status: 404 };
  }
}

/**
 * @async
 * @param {String} roomCode
 * @param {String} TokenId
 * @param {Function} loading
 */
async function joinTeam(teamId, team, TokenId, loading, server) {
  try {
    const headers = { 
      'X-Auth-Token': TokenId,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };

    console.log(teamId, team, TokenId);
    const response = await axios({
      method: 'PUT',
      url: `/teams/${teamId}`,
      baseURL: `${server || REST_URL}`,
      headers,
      data: team,
      onDownloadProgress: function (progressEvent) {
        loading(progressEvent)
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}

/**
 * @async
 * @param {String} roomCode
 * @param {String} TokenId
 * @param {Function} loading
 */
async function createTeam(team, TokenId, loading, server) {
  try {
    const headers = { 
      'X-Auth-Token': TokenId,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };

    const response = await axios({
      method: 'POST',
      url: '/teams',
      baseURL: `${server || REST_URL}`,
      headers,
      data: team,
      onDownloadProgress: function (progressEvent) {
        loading(progressEvent)
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}

/**
 * @description request function used to notify server of  a particular `state` is ready.
 * NOTE: should only be used by the host. No one else can call this function.
 * @param {String} TokenId 
 * @param {String} state 
 * @param {Object} data 
 * @param {String} server 
 */
async function stageReady(TokenId, state, data = {}, server) {
  try {
    const headers = { 
      'X-Auth-Token': TokenId,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };


    const response = await axios({
      method: 'POST',
      url: `/host/${state}`,
      baseURL: `${server || REST_URL}`,
      headers,
      data,
    });

    return response;
  } catch (error) {
    throw error;
  }
}


export default {
  createRoom,
  joinRoom,
  createTeam,
  joinTeam,
  stageReady,
}
