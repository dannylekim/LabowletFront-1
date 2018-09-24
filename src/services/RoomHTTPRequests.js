import url from '../config/RESTurl.json';
const axios = require('axios');
const REST_URL = url.dev;
const querystring = require('querystring');

/**
 * 
 * @param {Object} roomSetting 
 * @param {String} TokenId 
 */
async function createRoom(roomSetting, TokenId) {
  try {
    const response = await axios({
      method: 'POST',
      url: `${REST_URL}/rooms`,
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'X-Auth-Token': TokenId,
      },
      data: querystring.stringify(roomSetting),
    });
    if (response.status >= 300 && response.status < 200) {
      throw new Error(`Error ${response.status} creating new Room:`, response.statusText);
    }

    return response;
  } catch (error) {
    console.error('RoomHTTPRequests::createRoom:', error);
  }
}

/**
 * @async
 * @param {String} accessCode 
 */
async function JoinRoom(accessCode) {
  try {
    const response = await axios({
      method: 'PUT',
      url: `${REST_URL}/join`,
      headers: { 
        'Access-Control-Allow-Origin': '*',
      },
      data: querystring.stringify(accessCode),
    });
    if (response.status >= 300 && response.status < 200) {
      throw new Error(`Error ${response.status} creating new Room:`, response.statusText);
    }

    return response;
  } catch (error) {
    console.error('RoomHTTPRequests::createRoom:', error);
  }
}

export default {
  createRoom,
  JoinRoom,
}
