import React, {useState} from 'react';
import axios from 'axios';
import {Button} from '@react-native-material/core';
import {ListItem} from '@react-native-material/core';
import {View, StyleSheet, ScrollView, StatusBar} from 'react-native';
import Navbar from './Navbar';

export default function Inventory(props) {
  const [inventoryList, setInventoryList] = useState([]);

  const onGetBarcodeInventory = (barcodeValue, cmdType) => {
    console.log('barcode value: ', barcodeValue);
    //아래 함수의 파라미터로 문자열만 넘길 수 있음. barcodeValue가 문자열처럼 보이지만 문자열이 아닌 듯. String()는 작동하지 않음. JSON.stringify()는 작동함
    //  Alert.alert("barcode value: ", barcodeValue);
    if (cmdType == 'inventory') {
      axios.defaults.baseURL = 'http://13.230.73.69:8080';
      axios
        .get('/inventory/warehouse/' + barcodeValue)
        // axios.get("http://35.77.20.236:8080/import/lotno/" +barcodeValue)
        .then(res => {
          console.log(res.data);
          console.log(barcodeValue);
          setInventoryList(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const keyList = [
    ['이름', 'item_name'],
    ['수량', 'amount'],
    ['일자', 'inventory_date'],
  ];
  const MakeSecondText = ListItem => {
    let result = '';
    for (let i = 0; i < 3; i++) {
      result += keyList[i][0] + ': ' + ListItem[keyList[i][1]] + '\n';
    }
    return result;
  };

  return (
    <View>
      <Button
        color="#f1a178"
        title="창고 코드 스캔"
        onPress={() =>
          props.navigation.navigate('BarcodeScanner', {
            onGetBarcode: onGetBarcodeInventory,
            cmdType: 'inventory',
          })
        }
      />
      <ScrollView style={styles.scrollView}>
        {inventoryList.map((value, index) => {
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
