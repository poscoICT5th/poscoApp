import React, {useState} from 'react';
import axios from 'axios';
import {Button} from '@react-native-material/core';
import {ListItem} from '@react-native-material/core';
import {View, StyleSheet, ScrollView, StatusBar, Alert} from 'react-native';
import Navbar from './Navbar';

export default function Export(props) {
  const [exportList, setExportList] = useState([]);

  const onGetBarcodeExport = (barcodeValue, cmdType) => {
    console.log('barcode value: ', barcodeValue);
    //아래 함수의 파라미터로 문자열만 넘길 수 있음. barcodeValue가 문자열처럼 보이지만 문자열이 아닌 듯. String()는 작동하지 않음. JSON.stringify()는 작동함
    //  Alert.alert("barcode value: ", barcodeValue);
    if (cmdType == 'export') {
      axios.defaults.baseURL = 'http://13.230.30.203:8080';
      axios
        .get('/export/lotno/' + barcodeValue)
        // axios.get("http://13.230.30.203:8080/export/lotno/" +barcodeValue)
        .then(res => {
          console.log(123123123);
          console.log(res.data);
          console.log(res.data.instruction_no);
          axios
            .put('/export/export/' + res.data.instruction_no)
            .then(res2 => {
              Alert.alert('출고 완료되었습니다.');
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  return (
    <View>
      <Button
        color="#f1a178"
        title="출고 물품 확인"
        onPress={() =>
          props.navigation.navigate('BarcodeScanner', {
            onGetBarcode: onGetBarcodeExport,
            cmdType: 'export',
          })
        }
      />
      <ScrollView style={styles.scrollView}>
        {exportList.map((value, index) => {
          return (
            <ListItem
              title={value.lot_no}
              secondaryText={MakeSecondText(value)}
              key={index}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'white',
    marginTop: 0,
    marginBottom: 50,
    marginHorizontal: 70,
  },
});