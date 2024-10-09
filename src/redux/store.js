import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import languageSlice from './languageSlice';
import authSlice from './authSlice';
import  profileSlice  from './profileSlice';
import pollSlice from './pollSlice';
import triviaSlice from './triviaSlice'
import announcementSlice  from './announcementSlice';
import  discussionSlice  from './discussionSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
'auth_store', 'profile', 'language_store'
    // '  const selectedLanguage = useSelector(state => state?.language?.language);',
  ],
  // blacklist: ['filter_store'],
};

const reducers = combineReducers({
  auth_store: authSlice,
  language_store: languageSlice,
  profile: profileSlice,
  poll: pollSlice,
  trivia: triviaSlice,
  announcement: announcementSlice,
  discussion : discussionSlice
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: __DEV__ ? true : false,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);
