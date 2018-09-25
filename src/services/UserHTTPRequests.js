import url from '../config/RESTurl.json';
const axios = require('axios');
const REST_URL = url.dev;
// const querystring = require('querystring');

async function createUser(user) {
  try {
    const response = await axios({
      method: 'POST',
      url: `${REST_URL}/players`,
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(user),
    });

    if (response.status >= 300 && response.status < 200) {
      throw new Error(`Error ${response.status} creating new User:`, response.statusText);
    }

    return response
  } catch (error) {
    console.error('UserHTTPRequests::createUser:', error);
  }
}

export default {
  createUser,
}
