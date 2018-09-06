import url from '../config/RESTurl.json';
const axios = require('axios');
const REST_URL = url.dev;
const querystring = require('querystring');

async function createRoom(roomSetting, userTokenId) {
  try {
    const response = await axios({
      method: 'POST',
      url: `${REST_URL}/room`,
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'X-Auth-Token': userTokenId,
      },
      data: querystring.stringify(roomSetting),
    });
    if (response.status > 200) {
      throw new Error(`Error ${response.status} creating new Room:`, response.statusText);
    }

    return response;
  } catch (error) {
    console.error('RoomHTTPRequests::createRoom:', error);
  }
}

export default {
  createRoom,
}
