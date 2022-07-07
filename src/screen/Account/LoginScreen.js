import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  // Text,
  TextInput,
  View,
  Dimensions,
  // Button,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import axios from 'axios'
import { login } from '../../axios';
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";

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
    <NativeBaseProvider>
      <Center w="100%" marginTop={20}>
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
            color: "warmGray.50"
          }}>
            POSCO ICT - 5
          </Heading>
          <Heading mt="1" _dark={{
            color: "warmGray.200"
          }} color="coolGray.600" fontWeight="medium" size="xs">
            물류, 창고 재고 모니터링 시스템
          </Heading>
          <VStack space={3} mt="5">
            <FormControl.Label>ID</FormControl.Label>
            <Input onChange={(e) => { setInputId(e.nativeEvent.text) }} />
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChange={(e) => { setInputPw(e.nativeEvent.text) }} />
            <Button mt="2" onPress={() => { login({ id: inputId, pw: inputPw }), props.navigation.navigate('TodoList') }}>
              Sign in
            </Button>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}