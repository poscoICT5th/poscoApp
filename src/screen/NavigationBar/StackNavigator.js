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
const StackNavigator = props => {
  const StackInventory = cur_props => {
    return <Inventory setTitle={props.setTitle} {...cur_props} />;
  };
  const StackImport = cur_props => {
    return <Import setTitle={props.setTitle} {...cur_props} />;
  };
  const StackExport = cur_props => {
    return <Export setTitle={props.setTitle} {...cur_props} />;
  };
  const StackMove = cur_props => {
    return <Move setTitle={props.setTitle} {...cur_props} />;
  };
  const StackDashboard = cur_props => {
    return <Dashboard setTitle={props.setTitle} {...cur_props} />;
  };
  const StackMypage = cur_props => {
    return <Mypage setTitle={props.setTitle} {...cur_props} />;
  };
  const StackClaim = cur_props => {
    return <Claim setTitle={props.setTitle} {...cur_props} />;
  };

  const navOptionHandler = () => ({
    headerShown: false,
  });
  return (
    <StackApp.Navigator initialRouteName="Dashboard" backBehavior="history">
      <StackApp.Screen
        name="Inventory"
        component={StackInventory}
        options={navOptionHandler} // header & 뒤로가기
      />
      <StackApp.Screen
        name="Import"
        component={StackImport}
        options={navOptionHandler}
      />
      <StackApp.Screen
        name="Export"
        component={StackExport}
        options={navOptionHandler}
      />
      <StackApp.Screen
        name="Move"
        component={StackMove}
        options={navOptionHandler}
      />
      <StackApp.Screen
        name="Dashboard"
        component={StackDashboard}
        options={navOptionHandler}
      />
      <StackApp.Screen
        name="Mypage"
        component={StackMypage}
        options={navOptionHandler}
      />
        <StackApp.Screen
        name="Claim"
        component={StackClaim}
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
