import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import useRootData from './src/hooks/useRootData';
import MainNavigator from './src/screen/NavigationBar/MainNavigator'
import { TailwindProvider } from 'tailwindcss-react-native';

const App = () => {
  const { token, setToken } = useRootData(
    ({ screenModeStore }) => ({
      token: screenModeStore.token.get(),
      setToken: screenModeStore.setToken,
    }),
  );
  return (
    <TailwindProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </TailwindProvider>
  )
}

export default App