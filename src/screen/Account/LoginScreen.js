import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Button,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import axios from 'axios'
import { login } from '../../axios';

export default function LoginScreen(props) {
  const [inputId, setInputId] = useState("")
  const [inputPw, setInputPw] = useState("")

  const PermissionCheck = () => {
    //To Start Scanning
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: '카메라 권한 요청',
              message: '바코드를 스캔하기 위해 카메라 권한을 허용해주세요.',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If CAMERA Permission is granted
            //TODO BarcodeScanner.js를 호출하세요
            //this가 아니라 that을 사용해야 함
          } else {
            alert('카메라 권한을 받지 못했습니다.');
          }
        } catch (err) {
          alert('카메라 권한 오류: ', err);
          console.warn(err);
        }
      }
      //Calling the camera permission function
      requestCameraPermission();
    }
  };

  useEffect(() => {
    PermissionCheck();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.helloText}>로그인중인네이티브</Text>
        <TextInput
                id="id-address"
                name="id"
                type="text"
                placeholder="id"
                // onKeyDown={(e) => { console.log(e); }}
                onChange={(e)=>{setInputId(e.nativeEvent.text)}}
              />
        <TextInput
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                secureTextEntry = {true}
                // onKeyDown={(e) => {console.log(e) }}
                onChange={(e)=>{setInputPw(e.nativeEvent.text)}}
              />
        <Button
          color="#ff1178"
          title="Login"
          onPress={()=> {login({id: inputId, pw: inputPw}), props.navigation.navigate('TodoList')}}
          />
      </View>
    </View>
  );
}

  const screenWidth = Dimensions.get('screen').width;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    //  backgroundColor: '#1f1f1f',
      alignItems: 'center',
      paddingTop: 250,
    },
    helloText: {
    //  color: 'white',
      marginBottom: 20,
      fontSize: 30,
    },
    textInput: {
      padding: 5,
      paddingStart: 15,
      backgroundColor: '#3b3b3b',
      width: screenWidth * 0.8,
      borderRadius: 25,
      marginBottom: 15,
    //  color: 'white',
      fontWeight: '600',
    },
    loginBtn: {
      paddingHorizontal: 25,
      paddingVertical: 10,
      backgroundColor: '#ff1178',
      borderRadius: 25,
     // color: 'black',
      textAlign: 'center',
    },
  });