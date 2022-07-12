import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Account/LoginScreen';

function LoginNavigator() {
  const StackApp = createStackNavigator();
  const navOptionHandler = () => ({
    headerShown: false,
  });
  return (
    <StackApp.Navigator initialRouteName="LoginScreen">
      <StackApp.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={navOptionHandler}
      />
    </StackApp.Navigator>
  );
}

export default LoginNavigator;
