import React, {useCallback, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {Button} from '@react-native-material/core';
import {ListItem} from '@react-native-material/core';
import {View, StyleSheet, ScrollView, StatusBar, Alert
,TouchableOpacity,Animated
} from 'react-native';
import useRootData from '../hooks/useRootData';
import jwtDecode from 'jwt-decode';

import {useToast} from 'native-base';

import Import_first from './Import_first';
import { TabView, SceneMap } from 'react-native-tab-view';

function Import(props) {

  const toast = useToast();
  const [importList, setImportList] = useState([]);
  // store에서 token 갖고옴
  const {token} = useRootData(({screenModeStore}) => ({
    token: screenModeStore.token,
  }));

  let team = jwtDecode(token.get().token).info.team;
  const userWarehouseCode = team.split(' ');
  console.log(team);

//axios
useEffect(() => {
  axios.defaults.baseURL = 'http://35.77.20.236:8080/import';
  axios
    .get('/search', {
      params: {
        instruction_no: "전체보기",
        status: "전체보기",
        lot_no: "전체보기",
        item_code: "전체보기",
        item_name: "전체보기",
        min_order_amount: -1,
        max_order_amount: 10000000,
        min_im_amount: -1,
        max_im_amount: 10000000,
        unit: "전체보기",
        min_weight: -1,
        max_weight: 10000000,
        min_thickness: -1,
        max_thickness: 10000000,
        min_height: -1,
        max_height: 10000000,
        min_width: -1,
        max_width: 10000000,
        industry_family: "전체보기",
        product_family: "전체보기",
        location: "전체보기",
        to_warehouse: userWarehouseCode[0],
        customer: "전체보기",
        order_date: "전체보기",
        inst_reg_date: "전체보기",
        inst_deadline: "전체보기",
        done_date: "전체보기",
      },
    })
    .then(res => {
      setImportList(res.data);
      console.log(res.data, ' 이거 뭐야 ');
    })
    .catch(err => {
      console.log(err);
    });
}, []);
  
  const onGetBarcodeImport = (barcodeValue, cmdType) => {
    console.log('barcode value: ', barcodeValue);
    if (cmdType == 'import') {
      axios.defaults.baseURL = 'http://35.77.20.236:8080';
      axios
        .get('/import/search?to_warehouse=' + team)
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
                placement: 'bottom',
              });
              axios
                .get('/import/lotno/' + barcodeValue)
                // .get('/import/search?to_warehouse=399')
                .then(res3 => {
                  console.log('창고코드 들어왔나연~');
                  setImportList(res3.data);
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

  const FirstRoute = () => (
    <Import_first
      importList={importList}
      title='입고예정'
      onGetBarcodeImport={onGetBarcodeImport}
      navigation={props.navigation}
    />
  );
  const SecondRoute = () => (
    <Import_first
      importList={importList}
      title='입고완료'
      onGetBarcodeImport={onGetBarcodeImport}
      navigation={props.navigation}
    />
  );
  const ThirdRoute = () => (
    <Import_first
      importList={importList}
      title='입고취소'
      onGetBarcodeImport={onGetBarcodeImport}
      navigation={props.navigation}
    />
  );
  const [state, setState] = useState({
    index: 0,
    routes: [
      {key: 'first', title: '입고예정'},
      {key: 'second', title: '입고완료'},
      {key: 'third', title: '입고취소'},
    ],
  });
  _handleIndexChange = index => setState({...state, index: index});

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.5,
            ),
          });

          return (
            <TouchableOpacity
              key={i}
              style={styles.tabItem}
              onPress={() => setState({...state, index: i})}>
              <Animated.Text style={{opacity}}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (
    <TabView
      navigationState={state}
      renderScene={_renderScene}
      renderTabBar={_renderTabBar}
      onIndexChange={_handleIndexChange}
    />
  );
};
export default Import;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
});
