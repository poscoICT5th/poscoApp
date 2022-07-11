import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import useRootData from './src/hooks/useRootData';
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
<<<<<<< HEAD
        {/* <StackNavigator /> */}
=======
>>>>>>> 281737e9889fdbcfbe0ebe70ba540e86aa86b3ed
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

export default App