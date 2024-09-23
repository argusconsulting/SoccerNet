/**
 * @format
 */

import {ActivityIndicator, AppRegistry, Text, View} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {persistor, store} from './src/redux/store';

import {PersistGate} from 'redux-persist/integration/react';

const Root = () => {
  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        {/* content */}

        <PersistGate persistor={persistor}>
          <App />
          {/* <Toast config={config} /> */}
        </PersistGate>
      </GestureHandlerRootView>
    </>
  );
};

AppRegistry.registerComponent(appName, () => Root);
