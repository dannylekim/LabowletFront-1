import url from '../config/RESTurl.json';
const axios = require('axios');

const REST_URL = url.dev;

async function createUser(user) {
  try {
    const response = await axios.post(`${REST_URL}/player`, user);
    console.log(response)

    if (response.status > 200) {
      throw new Error('Error creating new User: ', response.statusText);
    }
    return response
  } catch (error) {
    console.error('UserHTTPRequests::createUser:', error);
  }
}

export default {
  createUser,
}
