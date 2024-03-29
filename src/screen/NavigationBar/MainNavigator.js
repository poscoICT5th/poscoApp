import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import StackNavigator from './StackNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardTodoList from '../Dashboard/DashboardTodoList';

const Drawer = createDrawerNavigator();

const MainNavigator = (props) => {
  const [title, setTitle] = useState('메인');
  const CustomStackNavigator = (cur_props) => {
    return <StackNavigator setTitle={setTitle} {...cur_props}/>
  }
  let customprops = {}
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
      drawerContent={props => {
        return <CustomDrawerContent {...props} setTitle={setTitle} />
        }
      }
    >
      {/* <Drawer.Screen name="LoginNavigator" component={LoginNavigator} /> */}
      <Drawer.Screen
        name="StackNavigator"
        component={CustomStackNavigator}
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
