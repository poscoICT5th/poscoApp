import React, {useEffect, useState} from 'react';
import {Animated, View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import axios from 'axios';
import Export_first from './Export_first';
import useRootData from '../hooks/useRootData';
import jwtDecode from 'jwt-decode';
import {TabView, SceneMap} from 'react-native-tab-view';
import { NativeBaseProvider } from 'native-base';
import WarehouseButton from './WarehouseButton';
const Export = props => {
  const [exportList, setExportList] = useState([]);
  const [curWarehouseCode, setCurWarehouseCode] = useState(''); //현재선택한창고코드

  // store에서 token 갖고옴
  const {token} = useRootData(({screenModeStore}) => ({
    token: screenModeStore.token,
  }));

  let team = jwtDecode(token.get().token).info.team;
  const userWarehouseCode = team.split(' ');
  const getExportData = () => {
    axios.defaults.baseURL = 'http://13.230.30.203:8080/export';
    axios
      .get('/search', {
        params: {
          instruction_no: '전체보기',
          status: '전체보기',
          lot_no: '전체보기',
          item_code: '전체보기',
          item_name: '전체보기',
          min_order_amount: 0,
          max_order_amount: 10000000,
          min_ex_amount: 0,
          max_ex_amount: 10000000,
          ex_remain: '전체보기',
          unit: '전체보기',
          min_width: 0,
          max_width: 10000000,
          min_weight: 0,
          max_weight: 10000000,
          min_thickness: 0,
          max_thickness: 10000000,
          min_height: 0,
          max_height: 10000000,
          product_family: '전체보기',
          location: '전체보기',
          from_warehouse: curWarehouseCode,
          customer: '전체보기',
          order_date: '전체보기',
          inst_reg_date: '전체보기',
          inst_deadline: '전체보기',
          done_date: '전체보기',
        },
      })
      .then(res => {
        setExportList(res.data);
        //console.log(res.data, ' 이거 뭐야 ');
      })
      .catch(err => {
        console.log(err);
      });
}
  //axios
  useEffect(() => {
    setCurWarehouseCode(userWarehouseCode[0])
    props.setTitle("출고")
    getExportData();
  }, []);
  //창고코드 바뀌면
  useEffect(() => {
    getExportData();
  }, [curWarehouseCode]);
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

  const FirstRoute = () => (
    <Export_first
      exportList={exportList}
      title="출고대기"
      onGetBarcodeExport={onGetBarcodeExport}
      navigation={props.navigation}
    />
  );
  const SecondRoute = () => (
    <Export_first
      exportList={exportList}
      title="출고완료"
      onGetBarcodeExport={onGetBarcodeExport}
      navigation={props.navigation}
    />
  );
  const [state, setState] = useState({
    index: 0,
    routes: [
      {key: 'first', title: '출고대기'},
      {key: 'second', title: '출고완료'},
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
  });

  return (
    <NativeBaseProvider style={(backgroundColor = '#fafaf9')}>
    <WarehouseButton
      userWarehouseCode={userWarehouseCode}
      setCurWarehouseCode={setCurWarehouseCode}
    />
    <TabView
      navigationState={state}
      renderScene={_renderScene}
      renderTabBar={_renderTabBar}
      onIndexChange={_handleIndexChange}
      />
          </NativeBaseProvider>
  );
};
export default Export;

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
