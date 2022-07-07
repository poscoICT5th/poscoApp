import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screen/Home';
import BarcodeScanner from './src/screen/BarcodeScanner';
import LoginScreen from './src/screen/Account/LoginScreen';
import Inventory from './src/screen/Inventory';
import Import from './src/screen/Import';
import Export from './src/screen/Export';
import Move from './src/screen/Move';
import TodoList from './src/screen/TodoList';
import Mypage from './src/screen/Mypage';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Stack } from 'native-base';
import useRootData from './src/hooks/useRootData';

const StackApp = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{backgroundColor: '#354259'}}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>메뉴</Text>
          {/* <Icon name="MehOutlined" size={30} /> */}
        </View>
      </View>

      <View style={styles.buttonWrap}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('TodoList');
              props.setTitle('Main');
            }}>
            <Text style={styles.title}>Main</Text>
          </TouchableOpacity>
        </View>
       
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Mypage');
              props.setTitle('Mypage');
            }}>
            <Text style={styles.title}>Mypage</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Inventory');
              props.setTitle('Inventory');
            }}>
            <Text style={styles.title}>Inventory</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Import');
              props.setTitle('Import');
            }}>
            <Text style={styles.title}>Import</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Export');
              props.setTitle('Export');
            }}>
            <Text style={styles.title}>Export</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Move');
              props.setTitle('Move');
            }}>
            <Text style={styles.title}>Move</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

function LoginNavigator(){
  const navOptionHandler = () => ({
    headerShown: false,
  });
  return(
    <StackApp.Navigator initialRouteName="LoginScreen">
      <StackApp.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={navOptionHandler}
      />
    </StackApp.Navigator>
  )
}

function StackNavigator() {
  const navOptionHandler = () => ({
    headerShown: false,
  });
  return (
    <StackApp.Navigator initialRouteName="LoginScreen" backBehavior="history">
      <StackApp.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={navOptionHandler}
      />
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
        name="TodoList"
        component={TodoList}
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
    </StackApp.Navigator>
  );
}

function MainNavigator(props) {
  const [title, setTitle] = useState('');

  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerType="slide"
      drawerStyle={{
        backgroundColor: '#2c3e50',
      }}
      drawerContent={props => <CustomDrawerContent {...props} setTitle={setTitle} />}>
      {/* <Drawer.Screen name="LoginNavigator" component={LoginNavigator} /> */}
      <Drawer.Screen
        name="StackNavigator"
        component={StackNavigator}
        options={{
          headerTitle: title,
          headerStyle: {
            backgroundColor: '#354259', //Set Header color
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
            // textAlign: 'center',
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  const {token, setToken} = useRootData(
    ({screenModeStore}) => ({
      token: screenModeStore.token.get(),
      setToken: screenModeStore.setToken,
    }),
  );

  return (
    <NavigationContainer>
      <MainNavigator />
      {/* {token ? <MainNavigator /> : <LoginNavigator/>} */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',

    // backgroundColor: '#f0f0f0',
    // borderColor: '#dccab2',
    // borderWidth: 3,
    // marginBottom: 20,
    padding: 20,
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    // color: '#243A73',
    color: '#fff',
    fontWeight: 'bold',
  },

  header: {
    // borderBottomWidth: '1px',
    borderColor: '#D3D3D3',
    // padding: 20,
    marginTop: 20,
    marginBottom: 40,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },

  headerIcon: {
    marginLeft: 20,
  },

  headerTitle: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    marginLeft: 20,
  },

  footer: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#fff',
    // backgroundColor: '#fff',
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  footerTitle: {
    fontSize: 15,
    color: '#fff',
    marginRight: 20,
    marginLeft: 10,
  },
});
