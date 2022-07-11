import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
} from '@react-navigation/drawer';
const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props} style={{ backgroundColor: '#354259' }}>
            <View style={styles.header}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>메뉴</Text>
                </View>
            </View>
            <View style={styles.buttonWrap}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('Dashboard');
                            props.setTitle('Main');
                        }}>
                        <Text style={styles.title}>Main</Text>
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

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('Mypage');
                            props.setTitle('Mypage');
                        }}>
                        <Text style={styles.title}>Mypage</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </DrawerContentScrollView>
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

export default CustomDrawerContent