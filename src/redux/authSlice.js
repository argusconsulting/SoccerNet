import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import RNRestart from 'react-native-restart';

async function saveToken(token) {
  await AsyncStorage.setItem('token', token);
}

async function removeToken() {
  await AsyncStorage.removeItem('token');
}

const initialState = {
  token: '',
  role: '',
  userID: '',
  google_token: '',
  userDetails: null,
};

// logout
export const userLogout = createAsyncThunk(
  'user/logout',
  async (_, {dispatch}) => {
    try {
      removeToken();
      dispatch(clearToken());
      RNRestart.Restart();
    } catch (error) {
      console.log('Error in logout', error);
      removeToken();
      dispatch(clearToken());
      RNRestart.Restart();
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAuthToken: (state, action) => {
      saveToken(action.payload);
      state.token = action.payload;
    },

    clearToken: state => {
      state.token = '';
      state.userDetails = null;
    },

    setUserID: (state, action) => {
      state.userID = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setSocialLoginToken: (state, action) => {
      state.google_token = action.payload;
    },
  },
});

export const {
  setUserAuthToken,
  clearToken,
  setUserDetails,
  setUserAuthRole,
  setUserID,
  setSocialLoginToken,
} = authSlice.actions;

export default authSlice.reducer;
