import React, { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import { login } from '../../axios';
import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider } from "native-base";
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import useRootData from '../../hooks/useRootData';

export default function LoginScreen(props) {
  const [id, setId] = useState("")
  const [pw, setPw] = useState("")
  const {loginApi} = useRootData(
    ({screenModeStore}) => ({
      loginApi: screenModeStore.loginApi,
    }),
  );

  function login(loginInfo) {
    axios.defaults.baseURL = "http://18.177.162.121:8080/user"
    axios
      .post('/login', loginInfo)
      .then(res => {
        console.log(res.data.sessionID)
        console.log(res.data.token);
        console.log(jwtDecode(res.data.token));
        props.navigation.navigate('Dashboard')
      })
      .catch((err) => {
        console.log(err)
      })
  }
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
            <Input onChange={(e) => { setId(e.nativeEvent.text) }} />
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChange={(e) => { setPw(e.nativeEvent.text) }} />
            <Button mt="2" onPress={() => { loginApi({id: id, pw: pw}) }}>
              Sign in
            </Button>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}