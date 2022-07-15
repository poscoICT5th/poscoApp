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
const StackNavigator = (props) => {
  const navOptionHandler = () => ({
    headerShown: false,
  });
  return (
    <StackApp.Navigator initialRouteName="Dashboard" backBehavior="history">
      <StackApp.Screen
        name="Inventory"
        // component={Inventory}
        component={() => <Inventory {...props}/>}
        options={navOptionHandler} // header & 뒤로가기
      />
      <StackApp.Screen
        name="Import"
        // component={Import}
        component={() => <Import {...props}/>}
        options={navOptionHandler}
      />
      <StackApp.Screen
        name="Export"
        // component={Export}
        component={() => <Export {...props}/>}
        options={navOptionHandler}
      />
      <StackApp.Screen
        name="Move"
        // component={Move}
        component={() => <Move {...props}/>}
        options={navOptionHandler}
      />
      <StackApp.Screen
        name="Dashboard"
        // component={Dashboard}
        component={() => <Dashboard {...props}/>}
        options={navOptionHandler}
      />
      <StackApp.Screen
        name="Mypage"
        // component={Mypage}
        component={() => <Mypage {...props}/>}
        options={navOptionHandler}
      />
        <StackApp.Screen
        name="Claim"
        // component={Claim}
        component={() => <Claim {...props}/>}
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
    </StackApp.Navigator>
  );
};

export default StackNavigator;
