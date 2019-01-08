import url from '../config/RESTurl.json';
const axios = require('axios');
const REST_URL = url.dev;

/**
 * 
 * @param {Object} roomSetting 
 * @param {String} TokenId 
 * @param {Function} loading
 */
async function createRoom(roomSetting, TokenId, loading) {
  try {
    const headers = { 
      'X-Auth-Token': TokenId,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };
    const response = await axios({
      method: 'POST',
      url: '/rooms',
      baseURL: `${REST_URL}`,
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
async function joinRoom(roomCode, TokenId, loading) {
  try {
    const headers = { 
      'X-Auth-Token': TokenId,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };
    const response = await axios({
      method: 'PUT',
      url: '/rooms',
      baseURL: `${REST_URL}`,
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
async function joinTeam(teamId, team, TokenId, loading) {
  try {
    const headers = { 
      'X-Auth-Token': TokenId,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };

    console.log(teamId, team);
    const response = await axios({
      method: 'PUT',
      url: `/teams/${teamId}`,
      baseURL: `${REST_URL}`,
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

export default {
  createRoom,
  joinRoom,
  joinTeam,
}
