import React, {useCallback, useEffect, useRef} from 'react';
import {View, PermissionsAndroid, Platform, Text} from 'react-native';
import {CameraScreen} from 'react-native-camera-kit';

const BarcodeScanner = props => {
  var isFirstGet = true;
  useEffect(() => {
    isFirstGet = true;
  }, []);

  function onBarcodeScan(barcodeValue) {
    console.log('onBarcodeScan');
    if (!isFirstGet) {
      return;
    }
    isFirstGet = false;
    if (
      props.route.params.cmdType == 'inventory' ||
      props.route.params.cmdType == 'import' ||
      props.route.params.cmdType == 'export' ||
      props.route.params.cmdType == 'move'
    ) {
      props.route.params.onGetBarcode(barcodeValue, props.route.params.cmdType);
    } else {
      props.route.params.onGetBarcode(barcodeValue, props.route.params.cmdType);
    }
    //TODO 필요한 부분 구현하세요
    // this.props.navigation.pop();

    //called after te successful scanning of QRCode/Barcode
    console.log('scanned barcode value: ' + barcodeValue);
    setTimeout(() => {
      isFirstGet = true;
    }, 1000);
  }


  function checkCameraPermission() {}
  return (
    <View>
      <CameraScreen
        showFrame={true}
        //Show/hide scan frame
        scanBarcode={true}
        //Can restrict for the QR Code only
        laserColor={'blue'}
        //Color can be of your choice
        frameColor={'yellow'}
        //If frame is visible then frame color
        colorForScannerFrame={'black'}
        //Scanner Frame color
        onReadCode={event => {
          console.log(999);
          return onBarcodeScan(event.nativeEvent.codeStringValue);
        }}
      />
    </View>
  );
};

export default BarcodeScanner;
