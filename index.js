/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import { StoreProvider } from './src/utils/context';  //  추가
import messaging from '@react-native-firebase/messaging'

messaging().setBackgroundMessageHandler(async message => {
  console.log(111)
  console.log(message)
})

const AppWithStore = () => (
  <StoreProvider>
    <App />
  </StoreProvider>
);

AppRegistry.registerComponent(appName, () => AppWithStore); //  변경
