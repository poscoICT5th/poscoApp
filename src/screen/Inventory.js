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

//창고안에 있는 재고들 출력
//최근순 , 상태 순 setstate 에 담
export default function Inventory(props) {
  const [inventoryList, setInventoryList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  //axios
  useEffect(() => {
    axios.defaults.baseURL = 'http://13.230.73.69:8080/inventory';
    axios
      //.get(`/warehouse/${warehouseCode}`)
      .get(`/warehouse/GA04`)
      .then(res => {
       // console.log(res.data, '받아온 데이터');
        setInventoryList(res.data);
        //setInventoryList([...res.data]);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const title = ' 제목';
  const subTitle = '부제목';
  return (
    <NativeBaseProvider>
      <ScrollView>
        {inventoryList.map(inventoryItem => {
          return (
            <Box alignItems="center" marginY={3}>
              <Box
                onPress={() => setShowModal(true)}
                width="80"
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
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
                  backgroundColor: 'gray.50',
                }}>
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading size="sm" ml="-1">
                    lot_no : ####
                    </Heading>
                    <Text
                      fontSize="md"
                      _light={{
                        color: 'violet.500',
                      }}
                      _dark={{
                        color: 'violet.400',
                      }}
                      fontWeight="500"
                      ml="-0.5"
                      mt="-1">
                      amount : {inventoryItem.amount}
                    </Text>
                  </Stack>
                 
                  <Text fontWeight="400">
                    item_name : {inventoryItem.item_name}
                  </Text>
                  <Text fontWeight="400">
                    item_code : {inventoryItem.item_code}
                  </Text>
                  <Text fontWeight="400">
                    inventory_date : {inventoryItem.inventory_date}
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
    </NativeBaseProvider>
  );
}
