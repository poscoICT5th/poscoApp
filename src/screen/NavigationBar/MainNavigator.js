import { View, Text } from 'react-native'
import React, { useState } from 'react'
import {
    createDrawerNavigator,
} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import StackNavigator from './StackNavigator'
const Drawer = createDrawerNavigator();

const MainNavigator = () => {
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
                        backgroundColor: '#B2C8DF', //Set Header color
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                        // textAlign: 'center',
                    },
                }}
            />
        </Drawer.Navigator>
    )
}

export default MainNavigator