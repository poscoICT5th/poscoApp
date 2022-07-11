import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

const StackApp = createStackNavigator();
const LoginNavigator = () => {
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
    )
}

export default LoginNavigator