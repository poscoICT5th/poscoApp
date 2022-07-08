import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppBar, Button, HStack, IconButton } from '@react-native-material/core';
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text } from 'react-native';
import SideMenu from 'react-native-side-menu';
import { View } from 'native-base';

export default function Navbar(props) {
  navi = useNavigation();
  console.log(navi);
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  const menu = <Menu navigator={navigator} />;
  return (
    <AppBar
      title="NavBar"
      leading={prop => (
        // <SideMenu menu={menu}></SideMenu>
        <Menu
          style={{
            width: '33%',
            height: '90%',
          }}
          visible={visible}
          anchor={
            <Text onPress={showMenu}>
              <Icon name="menu" size={24} />
            </Text>
          }
          onRequestClose={hideMenu}>
          <MenuItem
            onPress={() => {
              navi.navigate('TodoList');
            }}>
            <Text style={styles.menuItem}>메인(TodoList)</Text>
          </MenuItem>
          <MenuItem
            onPress={() => {
              navi.navigate('Inventory');
            }}>
            <Text style={styles.menuItem}>인벤토리</Text>
          </MenuItem>
          <MenuItem
            onPress={() => {
              navi.navigate('Import');
            }}>
            <Text style={styles.menuItem}>입고</Text>
          </MenuItem>
          <MenuItem
            onPress={() => {
              navi.navigate('Export');
            }}>
            <Text style={styles.menuItem}>출고</Text>
          </MenuItem>
          <MenuItem
            onPress={() => {
              navi.navigate('Move');
            }}>
            <Text style={styles.menuItem}>창고이동</Text>
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={() => { }}>
            <Text style={styles.menuItem}>로그아웃</Text>
          </MenuItem>
        </Menu>
      )}
    />
  );
}

const styles = StyleSheet.create({
  menuItem: {
    color: 'black',
  },
});
