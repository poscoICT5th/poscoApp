import React, {useEffect, useState} from 'react';
import {Animated, View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import Move_first from './Move_first';
import axios from 'axios';
import MoveModal from './MoveModal';
import {NativeBaseProvider} from 'native-base';
import Stagger1 from './Stagger1';
import useRootData from '../hooks/useRootData';
import jwtDecode from 'jwt-decode';
import WarehouseButton from './WarehouseButton';
const Move = props => {
  // store에서 token 갖고옴
  const {token} = useRootData(({screenModeStore}) => ({
    token: screenModeStore.token,
  }));

  let team = jwtDecode(token.get().token).info.team;
  const userWarehouseCode = team.split(' ');
  const [moveList, setMoveList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [curWarehouseCode, setCurWarehouseCode] = useState('');

  const getMoveData = () => {
    axios.defaults.baseURL = 'http://13.230.28.30:8080/move';
    axios
      .get('/search', {
        params: {
          instruction_no: '전체보기',
          status: '전체보기',
          lot_no: '전체보기',
          item_code: '전체보기',
          item_name: '전체보기',
          min_move_amount: 0,
          max_move_amount: 10000000,
          unit: '전체보기',
          min_weight: 0,
          max_weight: 10000000,
          min_width: 0,
          max_width: 10000000,
          min_thickness: 0,
          max_thickness: 10000000,
          min_height: 0,
          max_height: 10000000,
          location: '전체보기',
          from_warehouse: curWarehouseCode,
          to_warehouse: '전체보기',
          inst_reg_date: '전체보기',
          inst_deadline: '전체보기',
          done_date: '전체보기',
        },
      })
      .then(res => {
        setMoveList(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  //axios
  useEffect(() => {
    props.setTitle('이동');
    setCurWarehouseCode(userWarehouseCode[0]);
    getMoveData();
  }, []);
  //창고코드 바뀌면
  useEffect(() => {
    getMoveData();
  }, [curWarehouseCode]);
  //바코드용
  const onGetBarcodeMove = (barcodeValue, cmdType) => {
    console.log('barcode value: ', barcodeValue);
    //아래 함수의 파라미터로 문자열만 넘길 수 있음. barcodeValue가 문자열처럼 보이지만 문자열이 아닌 듯. String()는 작동하지 않음. JSON.stringify()는 작동함
    //  Alert.alert("barcode value: ", barcodeValue);
    if (cmdType == 'move') {
      axios.defaults.baseURL = 'http://13.230.30.203:8080';
      axios
        .get('/move/lotno/' + barcodeValue)
        .then(res => {
          axios
            .put('/move/export/' + res.data.instruction_no)
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
    <Move_first
      moveList={moveList}
      title="이동예정"
      onGetBarcodeMove={onGetBarcodeMove}
      navigation={props.navigation}
      style={{backgroundColor: '#ffffff'}}
    />
  );
  const SecondRoute = () => (
    <Move_first
      moveList={moveList}
      title="이동중"
      onGetBarcodeMove={onGetBarcodeMove}
      navigation={props.navigation}
    />
  );
  const ThirdRoute = () => (
    <Move_first
      moveList={moveList}
      title="이동완료"
      onGetBarcodeMove={onGetBarcodeMove}
      navigation={props.navigation}
      style={[styles.container, {backgroundColor: '#ffffff'}]}
    />
  );
  const [state, setState] = useState({
    index: 0,
    routes: [
      {key: 'first', title: '이동예정'},
      {key: 'second', title: '이동중'},
      {key: 'third', title: '이동완료'},
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
    <NativeBaseProvider >
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
export default Move;

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
    backgroundColor: 'white', //탭바 color
  },
});
