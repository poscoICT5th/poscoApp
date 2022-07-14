import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Account/LoginScreen';
import Inventory from '../Inventory';
import Import from '../Import';
import Export from '../Export';
import Move from '../Move';
import Home from '../Home';
import BarcodeScanner from '../BarcodeScanner';
import Dashboard from '../Dashboard/Dashboard';
import Mypage from '../Mypage';
import Claim from '../Claim';

const StackApp = createStackNavigator();
const StackNavigator = () => {
  const navOptionHandler = () => ({
    headerShown: false,
  });
  return (
    <StackApp.Navigator initialRouteName="Dashboard" backBehavior="history">
      <StackApp.Screen
        name="Inventory"
        component={Inventory}
        options={navOptionHandler} // header & 뒤로가기
      />
      <StackApp.Screen
        name="Import"
        component={Import}
        options={navOptionHandler}
      />
      <StackApp.Screen
        name="Export"
        component={Export}
        options={navOptionHandler}
      />
      <StackApp.Screen
        name="Move"
        component={Move}
        options={navOptionHandler}
      />
      <StackApp.Screen
        name="Dashboard"
        component={Dashboard}
        options={navOptionHandler}
      />
      <StackApp.Screen
        name="Home"
        component={Home}
        options={navOptionHandler}
      />
      <StackApp.Screen
        name="BarcodeScanner"
        component={BarcodeScanner}
        options={navOptionHandler}
      />
      <StackApp.Screen
        name="Mypage"
        component={Mypage}
        options={navOptionHandler}
      />
        <StackApp.Screen
        name="Claim"
        component={Claim}
        options={navOptionHandler}
      />
    </StackApp.Navigator>
  );
};

export default StackNavigator;
