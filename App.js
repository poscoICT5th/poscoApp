import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import useRootData from './src/hooks/useRootData';
import MainNavigator from './src/screen/NavigationBar/MainNavigator'
import { NativeBaseProvider } from 'native-base';
import LoginNavigator from './src/screen/NavigationBar/LoginNavigator'
const App = () => {
  const { token, setToken } = useRootData(
    ({ screenModeStore }) => ({
      token: screenModeStore.token.get(),
      setToken: screenModeStore.setToken,
    }),
  );
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {token ? <MainNavigator /> : <LoginNavigator />}
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

export default App