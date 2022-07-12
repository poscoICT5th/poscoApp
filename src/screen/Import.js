import React, {useCallback, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {Button} from '@react-native-material/core';
import {ListItem} from '@react-native-material/core';
import {View, StyleSheet, ScrollView, StatusBar, Alert} from 'react-native';
import useRootData from '../hooks/useRootData';
import jwtDecode from 'jwt-decode';
import Toast from 'react-native-easy-toast';
import {  useToast } from "native-base";
export default function Import(props) {
  const toast = useToast();
  const [importList, setImportList] = useState([]);
  // store에서 token 갖고옴
  const {token} = useRootData(({screenModeStore}) => ({
    token: screenModeStore.token,
  }));

  let team = jwtDecode(token.get().token).info.team;
  console.log(team);

  const toastRef = useRef();
  const showCopyToast = useCallback(() => {
    toastRef.current.show('주소가 복사되었습니다.');
  }, []);
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
          // console.log(token2);
          // setImportList(res.data);
          // axios.put("http://35.77.20.236:8080/import/import/" + res.data.instruction_no)
          axios
            .put('/import/import/' + res.data.instruction_no)
            .then(res2 => {
              // Alert.alert(res.data.instruction_no + ' 입고 완료되었습니다.');
              toast.show({
                title: res.data.instruction_no + ' 입고 완료되었습니다.',
                placement: "bottom"
              })
              axios
                .get('/import/search?to_warehouse=' + team)
                // .get('/import/search?to_warehouse=399')
                .then(res3 => {
                  console.log('창고코드 들어왔나연~');
                  setImportList(res3.data)
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
  const [click, setClick] = useState(false);
  function trueClick() {
    setClick(true);
  }
  function falseClick(params) {
    setClick(false);
  }
  return (
    <View>
      <Button
        color="#f1a178"
        title="입고 물품 확인"
        onPress={() =>
          props.navigation.navigate('BarcodeScanner', {
            onGetBarcode: onGetBarcodeImport,
            cmdType: 'import',
            trueClick: trueClick,
            click: click,
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
