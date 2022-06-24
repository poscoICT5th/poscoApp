import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screen/Home';
import BarcodeScanner from './src/screen/BarcodeScanner';
import LoginScreen from './src/screen/Account/LoginScreen';
import Inventory from './src/screen/Inventory';
import Import from './src/screen/Import';
import Export from './src/screen/Export';
import Move from './src/screen/Move';
import {AppBar, Button, HStack, IconButton} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ListItem} from '@react-native-material/core';
import {Menu, MenuDivider, MenuItem} from 'react-native-material-menu';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

export default function App(props) {
  const navigation = props.navigation;
  const navOptionHandler = () => ({
    headerShown: false,
  });

  const StackApp = createStackNavigator();
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  return (
    <NavigationContainer>
      {/* View App bar */}
      <View>
        <AppBar
          title="title"
          leading={props => (
            <Menu
              visible={visible}
              anchor={<Text onPress={showMenu}>Show menu</Text>}
              onRequestClose={hideMenu}>
              <MenuItem>메인(TodoList)</MenuItem>
              <MenuItem
                onPress={() =>
                  navigation.navigate('Inventory')
                }>
                인벤토리
              </MenuItem>
              <MenuItem onPress={() => {}}>입고</MenuItem>
              <MenuItem onPress={() => {}}>출고</MenuItem>
              <MenuItem onPress={() => {}}>창고이동</MenuItem>
              <MenuDivider />
              <MenuItem onPress={() => {}}>로그아웃</MenuItem>
            </Menu>
          )}
        />
      </View>
      {/*  */}
      <StackApp.Navigator initialRouteName="LoginScreen">
        <StackApp.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={navOptionHandler}
        />
        <StackApp.Screen
          name="Inventory"
          component={Inventory}
          options={{title: 'Inventory'}}
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
    </NavigationContainer>
  );
}
