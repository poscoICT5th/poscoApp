import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import StackNavigator from './StackNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardTodoList from '../Dashboard/DashboardTodoList';

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  const [title, setTitle] = useState('');

  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerType="slide"
      // drawerIcon={
      //   <Icon
      //     name="campfire"
      //     color="black"
      //   />
      // }
      drawerStyle={
        {
          // backgroundColor: '#bae6fd',
        }
      }
      drawerContent={props => (
        <CustomDrawerContent {...props} setTitle={setTitle} />
      )}
      drawerTodoList={props => (
        <DashboardTodoList {...props} setTitle={setTitle} />
      )}
    >
      {/* <Drawer.Screen name="LoginNavigator" component={LoginNavigator} /> */}
      <Drawer.Screen
        name="StackNavigator"
        component={StackNavigator}
        options={{
          headerTitle: title,
          headerStyle: {
            backgroundColor: '#fafafa', //Set Header color
          },
          headerTintColor: '#525252',
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
            // textAlign: 'center',
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
