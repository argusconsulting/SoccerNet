import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProjectUrl, SportsMonksToken, SportsMonkUrl} from '../../env';

const api = axios.create({
  baseURL: ProjectUrl,
});
const sportMonkApi = axios.create({
  baseURL: SportsMonkUrl,
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

// Set interceptors for SportsMonk API
sportMonkApi.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('sportMonkToken'); // Assuming a different token
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  error => Promise.reject(error),
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
        console.log('error', error);

        return reject(error.response.data);
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

// SportsMonk API POST function
export const postSportsMonkApi = async (
  path,
  data = {},
  headers = {Accept: 'application/json'},
) => {
  try {
    const response = await sportMonkApi.post(path, data, {headers});
    return response;
  } catch (error) {
    console.error('SportsMonk API POST Error:', error);
    throw error.response?.data || error;
  }
};

// SportsMonk API GET function
export const getSportsMonkApi = async (
  path,
  params = {},
  headers = {Accept: 'application/json'},
) => {
  headers.Authorization = `${SportsMonksToken}`;

  try {
    const response = await sportMonkApi.get(path, {headers, params});
    return response.data;
  } catch (error) {
    console.error('SportsMonk API GET Error:', error);
    throw error.response?.data || error;
  }
};
