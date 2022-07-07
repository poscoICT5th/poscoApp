import React, {useState} from 'react';
import axios from 'axios';
import {Button} from '@react-native-material/core';
import {ListItem} from '@react-native-material/core';
import {View, StyleSheet, ScrollView, StatusBar, Alert} from 'react-native';
import Navbar from './Navbar';

export default function Import(props) {
  const [importList, setImportList] = useState([]);

  const onGetBarcodeImport = (barcodeValue, cmdType) => {
    console.log('barcode value: ', barcodeValue);
    //아래 함수의 파라미터로 문자열만 넘길 수 있음. barcodeValue가 문자열처럼 보이지만 문자열이 아닌 듯. String()는 작동하지 않음. JSON.stringify()는 작동함
    //  Alert.alert("barcode value: ", barcodeValue);
    if (cmdType == 'import') {
      axios.defaults.baseURL = 'http://35.77.20.236:8080';
      axios
        .get('/import/lotno/' + barcodeValue)
        // axios.get("http://35.77.20.236:8080/import/lotno/" +barcodeValue)
        .then(res => {
          console.log(123123123);
          console.log(res.data);
          console.log(res.data.instruction_no);
          // setImportList(res.data);
          // axios.put("http://35.77.20.236:8080/import/import/" + res.data.instruction_no)
          axios
            .put('/import/import/' + res.data.instruction_no)
            .then(res2 => {
              Alert.alert(res.data.instruction_no + ' 입고 완료되었습니다.');
            })
            .catch(e => {
              console.log(e);
              Alert.alert(e);
            });
        })
        .catch(e => {
          console.log(e);
          Alert.alert(e);
        });
    }
  };

  const keyList = [
    ['상태', 'status'],
    ['이름', 'item_name'],
    ['수량', 'amount'],
    ['일자', 'order_date'],
  ];
  const MakeSecondText = ListItem => {
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += keyList[i][0] + ': ' + ListItem[keyList[i][1]] + '\n';
    }
    return result;
  };

  return (
    <View>
      <Button
        color="#f1a178"
        title="입고 물품 확인"
        onPress={() =>
          props.navigation.navigate('BarcodeScanner', {
            onGetBarcode: onGetBarcodeImport,
            cmdType: 'import',
          })
        }
      />

      <ScrollView style={styles.scrollView}>
        {importList.map((value, index) => {
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