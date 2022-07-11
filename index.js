/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import { StoreProvider } from './src/utils/context';  //  추가


const AppWithStore = () => (
  <StoreProvider>
    <App />
  </StoreProvider>
);

AppRegistry.registerComponent(appName, () => AppWithStore); //  변경
