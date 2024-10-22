import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProjectUrl} from '../../env';

const api = axios.create({
  baseURL: ProjectUrl,
});

//* 2xx ->  Success
//* 4xx ->  client side error
//* 5xx ->  server side error
//** Axios reject the response if the status code belongs to 5xx and 4xx */
//! 401 Unauthorized -> you are not login
//! 403 Forbidden    ->    you are login but not have permissions
//! 400 Bad Request  -> error from client side check your arguments in body
//! 404 Not Found    -> endpoint does not exist
//! 500 Internal Server Error  -> error from the server side

api.interceptors.request.use(
  async config => {
    let token = await AsyncStorage.getItem('token');
    // console.log('token in api services', token);
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },

  error => {
    return Promise.reject(error);
  },
);
export const postApi = async (
  path,
  data = {},
  headers = {Accept: 'application/json'},
) => {
  var result = await new Promise((resolve, reject) => {
    api
      .post(path, data, {
        headers: headers,
      })
      .then(response => {
        // console.timeEnd('Time');
        return resolve(response);
      })
      .catch(error => {
        console.log('hey post api error');
        console.log('error', error.response.data);

        return reject(error.response.data);
      });
  });
  return result;
};

export const patchApi = async (
  path,
  data = {},
  headers = {Accept: 'application/json'},
) => {
  try {
    const response = await api.patch(path, data, {
      headers: headers,
    });
    return response;
  } catch (error) {
    console.log('hey patch api error');
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const putApi = async (
  path,
  data = {}, // Default to an empty object if no data is provided
  headers = {Accept: 'application/json'}, // Default headers
) => {
  try {
    const response = await api.put(path, data, {
      headers: headers,
    });
    return response;
  } catch (error) {
    console.error('PUT API error'); // Log a simple error message
    if (error.response) {
      console.error(error.response.data); // Log detailed error information if available
      throw error.response.data; // Throw the error details for further handling
    } else {
      throw new Error('Unknown error occurred'); // If no response, throw a generic error
    }
  }
};

export const deleteApi = async (
  path,
  data,
  headers = {Accept: 'application/json'},
) => {
  var result = await new Promise((resolve, reject) => {
    api
      .delete(path, {
        headers: headers,
        data: data,
      })
      .then(response => {
        return resolve(response);
      })
      .catch(error => {
        return reject(error.response?.data);
      });
  });
  return result;
};

export const getApi = async (
  path,
  data = {},
  token = null,
  headers = {Accept: 'application/json'},
) => {
  var result = await new Promise((resolve, reject) => {
    if (token) {
      headers.Authorization = `${token}`;
    }

    api
      .get(path, data, {
        headers: headers,
      })
      .then(response => resolve(response.data))
      .catch(error => {
        // if (error.response.status === 401) {
        //     store.getState().auth.email &&
        //         store.dispatch(userForceSignOut());
        //     return;
        // }

        return reject(error.response.data);
      });
  });
  return result;
};
