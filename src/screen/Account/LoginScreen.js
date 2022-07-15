import React, {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import {login} from '../../axios';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  NativeBaseProvider,
  Text
} from 'native-base';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import useRootData from '../../hooks/useRootData';

export default function LoginScreen(props) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const {loginApi} = useRootData(({screenModeStore}) => ({
    loginApi: screenModeStore.loginApi,
  }));

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
      <Center marginTop={70} w="130%" h="90%">
        <Box safeArea w="70%">
          <Heading
            size="2xl"
            fontWeight="600"
            color="muted.600"
            _dark={{
              color: 'warmGray.50',
            }}>
            Even Better
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: 'warmGray.200',
            }}
            color="muted.600"
            fontWeight="medium"
            size="lg">
            물류, 창고 재고 모니터링 시스템
          </Heading>
          <VStack space={3} mt="5" w="70%">
           
            <Text
         fontSize="xl"
            >ID</Text>
            <Input
              onChange={e => {
                setId(e.nativeEvent.text);
              }}
            />
            <Text
              fontSize="xl"
              mt="3"
            >Password</Text>
            <Input
              type="password"
              onChange={e => {
                setPw(e.nativeEvent.text);
              }}
            />
            <Button
              mt="7"
              onPress={() => {
                loginApi({id: id, pw: pw});
              }}
              bg="amber.400"
              _hover={{
                _text: {color: 'secondary.900'},
              }}>
              Sign in
            </Button>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}
