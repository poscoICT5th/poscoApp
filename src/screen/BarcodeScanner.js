import React, {Component} from 'react';
import {View, PermissionsAndroid, Platform, Text} from 'react-native';
import {CameraScreen} from 'react-native-camera-kit';

var isFirstGet = true;
//default는 App.js에서만 사용해야 하는 듯
class BarcodeScanner extends Component {
  cmdType = null;
  constructor(props) {
    console.log('BarcodeScanner');
    super(props);
    this.cmdType = props.route.params.cmdType;
  }

  componentDidMount() {
    //isFirstGet의 이전 값이 남아 있어서 다시 실행할 때 true를 할당해야 함
    isFirstGet = true;
  }

  componentWillUnmount() {}

  /**
   * 바코드 스캔
   */

  onBarcodeScan(barcodeValue) {
    console.log('onBarcodeScan');
    if (!isFirstGet) {
      return;
    }
    isFirstGet = false;
    if (
      this.cmdType == 'inventory' ||
      this.cmdType == 'import' ||
      this.cmdType == 'export' ||
      this.cmdType == 'move'
    ) {
      this.props.route.params.onGetBarcode(barcodeValue, this.cmdType);
    } else {
      this.props.route.params.onGetBarcode(barcodeValue, this.cmdType);
    }
    //TODO 필요한 부분 구현하세요
    // this.props.navigation.pop();

    //called after te successful scanning of QRCode/Barcode
    console.log('scanned barcode value: ' + barcodeValue);

    setTimeout(() => {
      isFirstGet = true;
    }, 2000);
  }

  //AAAAAZZZZZ

  //TODO Home.js로 이동시키세요
  checkCameraPermission() {}

  render() {
    return (
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
          return this.onBarcodeScan(event.nativeEvent.codeStringValue);
        }}
      />
    );
  }
}

export default BarcodeScanner;
