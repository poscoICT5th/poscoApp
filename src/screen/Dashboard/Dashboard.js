import {
  Text,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DashboardTodoList from './DashboardTodoList';
import {Heading} from 'native-base';
import {importToday} from '../../axios';
import axios from 'axios';
import DashboardTodayChart from './DashboardTodayChart';
import moment from 'moment';
import {View, NativeBaseProvider, Stack, Center} from 'native-base';
import InventoryStagger from '../InventoryStagger';
import messaging from '@react-native-firebase/messaging';
import useRootData from '../../hooks/useRootData';
import jwtDecode from 'jwt-decode';
import Swipe from '../Swipe';

const importURL = 'http://35.77.20.236:8080/import';
const exportURL = 'http://13.230.30.203:8080/export';
const moveURL = 'http://35.77.44.58:8080/move';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Dashboard = props => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [reloadHotline, setReloadHotline] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    setReloadHotline(!reloadHotline);
  }, []);
  // user정보 추출
  const {token} = useRootData(({screenModeStore}) => ({
    token: screenModeStore.token,
  }));

  let user = jwtDecode(token.get().token).info;
  const userId = user.id;
  const userWarehouseCode = user.team.split(' ');

  // 입고데이터
  function importAxios(params) {
    axios.defaults.baseURL = importURL;
    axios
      .get('/search', {
        params: {
          instruction_no: '전체보기',
          status: '전체보기',
          lot_no: '전체보기',
          item_code: '전체보기',
          item_name: '전체보기',
          min_order_amount: -1,
          max_order_amount: 10000000,
          min_im_amount: -1,
          max_im_amount: 10000000,
          unit: '전체보기',
          min_weight: -1,
          max_weight: 10000000,
          min_thickness: -1,
          max_thickness: 10000000,
          min_height: -1,
          max_height: 10000000,
          min_width: -1,
          max_width: 10000000,
          industry_family: '전체보기',
          product_family: '전체보기',
          location: '전체보기',
          to_warehouse: '전체보기',
          customer: '전체보기',
          order_date: '전체보기',
          inst_reg_date: '전체보기',
          inst_deadline: '2022-12-31',
          done_date: '전체보기',
        },
      })
      .then(res => {
        setImportData(res.data);
      })
      .catch(err => {});
  }
  //출고데이터
  function exportAxios(params) {
    axios.defaults.baseURL = exportURL;
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
          from_warehouse: '전체보기',
          customer: '전체보기',
          order_date: '전체보기',
          inst_reg_date: '전체보기',
          inst_deadline: moment().format('YY-MM-DD'),
          done_date: '전체보기',
        },
      })
      .then(res => {
        setExportData(res.data);
      })
      .catch(err => {});
  }
  //창고이동데이터
  function moveAxios(params) {
    axios.defaults.baseURL = moveURL;
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
          from_warehouse: '전체보기',
          to_warehouse: '전체보기',
          inst_reg_date: '전체보기',
          inst_deadline: moment().format('YY-MM-DD'),
          done_date: '전체보기',
        },
      })
      .then(res => {
        setMoveData(res.data);
      })
      .catch(err => {});
  }
  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      props.setTitle('메인');
    }
    messaging().subscribeToTopic(userId);
    userWarehouseCode.map(wh_code => {
      messaging().subscribeToTopic(wh_code);
    });
    // importAxios();
    // exportAxios();
    // moveAxios();

    return () => {cleanup = false}
  }, []);
  return (
    <NativeBaseProvider>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          <DashboardTodayChart />
          <Center>
            <Stack direction="row" mb="1" mt="1.5" space={12}>
              <DashboardTodoList
                title="재고"
                subTitle="담당하는 창고의 재고현황 파악"
                navigate="Inventory"
                navigation={props.navigation}
                // setTitle={props.route.params.setTitle}
              />
              <DashboardTodoList
                title="창고입고"
                subTitle="담당 창고 입고 리스트"
                navigate="Import"
                navigation={props.navigation}
                // setTitle={props.route.params.setTitle}
              />
            </Stack>
            {/* 두번째줄 */}
            <Stack direction="row" mb="2.5" mt="1" space={12}>
              <DashboardTodoList
                title="창고출고"
                subTitle="담당 창고 출고 리스트"
                navigate="Export"
                navigation={props.navigation}
                // setTitle={props.route.params.setTitle}
              />
              <DashboardTodoList
                title="창고이동"
                subTitle="담당 창고 이동 리스트"
                navigate="Move"
                navigation={props.navigation}
                // setTitle={props.route.params.setTitle}
              />
            </Stack>
          </Center>
          <Swipe reloadHotline={reloadHotline} />
        </View>
      </ScrollView>
      <View style={{position: 'absolute', bottom: 0, right: 13}}>
        <InventoryStagger
          //   title="import"
          //   onGetBarcode={props.onGetBarcodeImport}
          navigation={props.navigation}
        />
      </View>
    </NativeBaseProvider>
  );
};
const styles = StyleSheet.create({
  dashboardTodolist: {
    marginTop: 10,
  },
});
export default Dashboard;
