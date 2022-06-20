/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component } from 'react';
 import { Button, Alert, View, SafeAreaView, PermissionsAndroid, Platform, Text } from 'react-native';
 import axios from 'axios';
 
 
 //default는 App.js에서만 사용해야 하는 듯 
 export default class Home extends Component {
     /**
  * 바코드 스캔
  */
     scanBarcode = (cmdType) => {
 
         var that = this;
         //To Start Scanning
         if (Platform.OS === 'android') {
             async function requestCameraPermission() {
                 try {
                     const granted = await PermissionsAndroid.request(
                         PermissionsAndroid.PERMISSIONS.CAMERA, {
                         'title': '카메라 권한 요청',
                         'message': '바코드를 스캔하기 위해 카메라 권한을 허용해주세요.'
                     }
                     )
                     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                         //If CAMERA Permission is granted
 
                         //TODO BarcodeScanner.js를 호출하세요 
                         //this가 아니라 that을 사용해야 함 
                         that.props.navigation.navigate('BarcodeScanner', { onGetBarcode: that.onGetBarcode, cmdType : cmdType })
                     } else {
                         alert("카메라 권한을 받지 못했습니다.");
                     }
                 } catch (err) {
                     alert("카메라 권한 오류: ", err);
                     console.warn(err);
                 }
             }
             //Calling the camera permission function
             requestCameraPermission();
         } else {
             that.props.navigation.navigate('BarcodeScanner', { onGetBarcode: that.onGetBarcode, cmdType : cmdType })
         }
     }
 
     onGetBarcode = (barcodeValue, cmdType) => {
         console.log("barcode value: ", barcodeValue);
         //아래 함수의 파라미터로 문자열만 넘길 수 있음. barcodeValue가 문자열처럼 보이지만 문자열이 아닌 듯. String()는 작동하지 않음. JSON.stringify()는 작동함 
        //  Alert.alert("barcode value: ", barcodeValue);

        if (cmdType == "import") {
            axios.defaults.baseURL = "http://35.77.20.236:8080"
            axios.get("/import/lotno/" +barcodeValue)
            // axios.get("http://35.77.20.236:8080/import/lotno/" +barcodeValue)
            .then((res)=>{
                console.log(123123123)
                console.log(res.data)
                console.log(res.data.instruction_no)
                // axios.put("http://35.77.20.236:8080/import/import/" + res.data.instruction_no)
                axios.put("/import/import/" + res.data.instruction_no)
                .then((res2)=>{
                    Alert.alert("입고 완료되었습니다.")
                })
                .catch((e)=>{
                    console.log(e)
                    Alert.alert(e)
                })
            }) 
            .catch((e)=> {
                console.log(e)
                Alert.alert(e)

            })
        } else if (cmdType == "move") {
            axios.defaults.baseURL = "http://35.77.44.58:8080"
            // axios.get("http://35.77.44.58:8080/move/lotno/" +barcodeValue)
            axios.get("/move/lotno/" +barcodeValue)
            .then((res)=>{
                console.log(123123123)
                console.log(res.data)
                console.log(res.data.instruction_no)
                axios.put("/move/move/" + res.data.instruction_no)
                .then((res2)=>{
                    Alert.alert("이동 처리 되었습니다.")
                })
                .catch((e)=>{console.log(e)
                    
                })
            }) 
            .catch((e)=> {
                console.log(e)

            })
        } else {
            axios.defaults.baseURL = "http://13.230.30.203:8080"
            axios.get("/export/lotno/" +barcodeValue)
            // axios.get("http://13.230.30.203:8080/export/lotno/" +barcodeValue)
            .then((res)=>{
                console.log(123123123)
                console.log(res.data)
                console.log(res.data.instruction_no)
                axios.put("/export/export/" + res.data.instruction_no)
                .then((res2)=>{
                    Alert.alert("출고 완료되었습니다.")
                })
                .catch((e)=>{console.log(e)})
            }) 
            .catch((e)=> {
                console.log(e)

            })
        }
     };
 
 
     render() {
         return (
             <View style={{ flex: 1 }}>
                 <SafeAreaView style={{ flex: 1, justifyContent: "center",  alignItems: "center"}}>
                 <Button
                    title="입고 물품 확인"
                    onPress={() => this.scanBarcode("import")}
                />
                <Text>
                
                </Text>
                <Button
                    title="이동 물품 확인"
                    onPress={() => this.scanBarcode("move")}
                />
                <Text>
                
                </Text>
                <Button
                    title="출고 물품 확인"
                    onPress={() => this.scanBarcode("export")}
                />
                 </SafeAreaView>
             </View>
         );
 
     }
 
 }