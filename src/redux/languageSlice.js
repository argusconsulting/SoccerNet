// src/redux/slices/languageSlice.js
import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    language: 'ar', // default language
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      console.log('action.payload', action);
      AsyncStorage.setItem('selectedLanguage', action.payload);
    },
    loadLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const {setLanguage, loadLanguage} = languageSlice.actions;

export const loadStoredLanguage = () => async dispatch => {
  const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
  if (savedLanguage) {
    dispatch(loadLanguage(savedLanguage));
  }
};

export default languageSlice.reducer;
