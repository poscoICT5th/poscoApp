import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import useRootData from './src/hooks/useRootData';
import StackNavigator from './src/screen/NavigationBar/StackNavigator'
import MainNavigator from './src/screen/NavigationBar/MainNavigator'
import { NativeBaseProvider } from 'native-base';

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
        <MainNavigator />
        <StackNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

export default App