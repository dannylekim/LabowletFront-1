import url from '../config/RESTurl.json';
import * as Sentry from '@sentry/browser';

const axios = require('axios');
const REST_URL = url.prod;

async function createUser(user, server) {
  try {
    const response = await axios({
      method: 'POST',
      url: `${server || REST_URL}/players`,
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(user),
    });

    if (response.status >= 300 && response.status < 200) {
      throw new Error(`Error ${response.status} creating new User: ${response.message}`);
    }

    return response
  } catch (error) {
    Sentry.captureException(error);
    const errMessage = `UserHTTPRequests::createUser: ${error.message}`;
    console.error(errMessage);
    throw new Error(errMessage);
  }
}

export default {
  createUser,
}
