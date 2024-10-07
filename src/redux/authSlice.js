import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postApi } from '../../scripts/api-services';
import { api_name_logout } from '../../constants/api-constants';
import RNRestart from 'react-native-restart';


import { clearAll } from '../../components/local-storage';
// import { postApi } from '../../scripts/api-services';

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
export const userLogout = createAsyncThunk('user/logout', async (_,{ dispatch }) => {
    try {
        const response = await postApi(api_name_logout);
        removeToken();
        dispatch(clearToken()); 
        RNRestart.Restart();
        return response;
    } catch (error) {
        console.log('Error in logout', error);
        removeToken();
        dispatch(clearToken()); 
        RNRestart.Restart();
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserAuthToken: (state, action) => {
            saveToken(action.payload);
            state.token = action.payload;
        },
        
    
        clearToken: (state) => { 
            state.token = '';  
            state.userDetails = null;
        },
        // setUserAuthRole: (state, action) => {
        //     state.role = action.payload;
        // },
        setUserID: (state, action) => {
            state.userID = action.payload;
        },
        setUserDetails: (state, action) => { 
            state.userDetails = action.payload;
        },
    },
});

export const {
    setUserAuthToken,
    clearToken,
    setUserDetails, 
    // setUserAuthRole,
    setUserID,
    // setSocialLoginToken,
} = authSlice.actions;

export default authSlice.reducer;
