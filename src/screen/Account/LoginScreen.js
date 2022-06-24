import React, {useEffect} from 'react';
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

const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
    paddingTop: 250,
  },
  helloText: {
    color: 'white',
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
    color: 'white',
    fontWeight: '600',
  },
  loginBtn: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: '#ff1178',
    borderRadius: 25,
    color: 'black',
    textAlign: 'center',
  },
});

export default function LoginScreen(props) {
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
        <Text style={styles.helloText}>망한네이티브</Text>
        <TextInput placeholder="id" style={styles.textInput} />
        <TextInput
          placeholder="password"
          secureTextEntry
          style={styles.textInput}
        />
        <Button
          color="#ff1178"
          title="Login"
          onPress={() => props.navigation.navigate('Inventory')}
        />
      </View>
    </View>
  );
}
