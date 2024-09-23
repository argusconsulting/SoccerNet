/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LogBox} from 'react-native';
import Routes from './src/routes/routes';
import {store} from './src/redux/store';
import i18n from './src/languages/i18n';
import {I18nextProvider} from 'react-i18next';
import {Provider} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from './src/styles/tailwind';
import {loadLanguage} from './src/redux/languageSlice';

function App() {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoredLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      console.log('value of saved lang', savedLanguage);
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage); // Set the language for i18n
        store.dispatch(loadLanguage(savedLanguage)); // Set the language in Redux
      }
      setLoading(false); // Stop loading once the language is set
    };

    loadStoredLanguage();
  }, []);

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#6A36CE" />
        <Text style={tw`text-[#fff] mt-2`}>Loading...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Routes />
        </I18nextProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
