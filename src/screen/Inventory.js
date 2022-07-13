import React, {useEffect, useState} from 'react';
import axios from 'axios';
//import {Button} from '@react-native-material/core';
import {ListItem} from '@react-native-material/core';
import {View, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
  Modal,
  VStack,
  Button,
} from 'native-base';

import Navbar from './Navbar';
import InventoryModal from './InventoryModal';
import InventoryButton from './InventoryButton';
import Actionsheet1 from './Actionsheet1';
import Stagger1 from './Stagger1';
import InventoryStagger from './InventoryStagger';
import useRootData from '../hooks/useRootData';
import jwtDecode from 'jwt-decode';
//창고안에 있는 재고들 출력
//최근순 , 상태 순 setstate 에 담
export default function Inventory(props) {
  const [inventoryList, setInventoryList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // store에서 token 갖고옴
  const {token} = useRootData(({screenModeStore}) => ({
    token: screenModeStore.token,
  }));
  let team = jwtDecode(token.get().token).info.team;
  console.log(team);

  const userInfo = {
    warehouse_code: team,
  };
  const userWarehouseCode = userInfo.warehouse_code.split(' ');
  const [curWarehouseCode, setCurWarehouseCode] = useState(''); //현재선택한창고코드

  const getInvenData = warehouse_code => {
    axios.defaults.baseURL = 'http://13.230.73.69:8080/inventory';
    axios
      .get(`/warehouse/` + warehouse_code)
      .then(res => {
        // console.log(res.data, ' 인벤토리데이터');
        setInventoryList(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //axios
  useEffect(() => {
    console.log('useeffect');
    setCurWarehouseCode(userWarehouseCode[0]);
    getInvenData(userWarehouseCode[0]);
  }, []);

  //창고코드 바뀌면
  useEffect(() => {
    getInvenData(curWarehouseCode);
  }, [curWarehouseCode]);
  //정렬
  function sortDate() {
    inventoryList.sort(function (a, b) {
      if (a.inventory_date < b.inventory_date) return -1;
      if (a.inventory_date > b.inventory_date) return 1;
      if (a.inventory_date === b.inventory_date) return 0;
      else return -1;
    });
    setInventoryList([...inventoryList]);
  }
  function sortState() {
    inventoryList.sort(function (a, b) {
      if (a.state < b.state) return -1;
      if (a.state > b.state) return 1;
      if (a.state === b.state) return 0;
      else return -1;
    });
    setInventoryList([...inventoryList]);
  }
  function sortProduct() {
    inventoryList.sort(function (a, b) {
      if (a.product_family < b.product_family) return -1;
      if (a.product_family > b.product_family) return 1;
      if (a.product_family === b.product_family) return 0;
      else return -1;
    });
    setInventoryList([...inventoryList]);
  }

  return (
    <NativeBaseProvider style={(backgroundColor = '#fafaf9')}>
      <ScrollView style={(backgroundColor = '#fafaf9')}>
        <Center flex={1} px="7">
          <HStack>
            <Actionsheet1
              sortDate={sortDate}
              sortState={sortState}
              sortProduct={sortProduct}
            />
            <InventoryButton
              userWarehouseCode={userWarehouseCode}
              setCurWarehouseCode={setCurWarehouseCode}
            />
          </HStack>
        </Center>

        {inventoryList.map(inventoryItem => {
          return (
            <Box alignItems="center" marginY={3}>
              <Box
                onPress={() => setShowModal(true)}
                width="80"
                rounded="lg"
                overflow="hidden"
                borderColor="#fafaf9"
                borderWidth="1"
                _dark={{
                  borderColor: 'coolGray.600',
                  backgroundColor: 'gray.700',
                }}
                _web={{
                  shadow: 2,
                  borderWidth: 0,
                }}
                _light={{
                  backgroundColor: '#fafaf9',
                }}>
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading size="sm" ml="-1">
                      lot_no : {inventoryItem.lot_no}
                    </Heading>
                    <Text
                      fontSize="md"
                      _light={{
                        // color: 'info.500',
                        color: 'amber.500',
                      }}
                      _dark={{
                        color: 'info.800',
                      }}
                      fontWeight="500"
                      ml="-0.5"
                      mt="-1">
                      재고량 : {inventoryItem.amount}
                    </Text>
                  </Stack>

                  <Text fontWeight="400">
                    제품이름 : {inventoryItem.item_name}
                  </Text>
                  <Text fontWeight="400">
                    제품코드 : {inventoryItem.item_code}
                  </Text>
                  <Text fontWeight="400">
                    상태 : {inventoryItem.state ? inventoryItem.state : '대기'}
                  </Text>
                  <Text fontWeight="400">
                    입고날짜 : {inventoryItem.inventory_date}
                  </Text>
                </Stack>
                <InventoryModal
                  showModal={showModal}
                  setShowModal={setShowModal}
                  inventoryItem={inventoryItem}
                />
              </Box>
            </Box>
          );
        })}
      </ScrollView>
      <View style={{position: 'absolute', bottom: 0, right: 13}}>
        <InventoryStagger
        // title="move"
        // onGetBarcode={props.onGetBarcodeMove}
         navigation={props.navigation}
        />
      </View>
    </NativeBaseProvider>
  );
}
