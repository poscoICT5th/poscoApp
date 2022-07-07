import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button} from '@react-native-material/core';
import {ListItem} from '@react-native-material/core';
import {View, StyleSheet, ScrollView, StatusBar} from 'react-native';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider } from "native-base";

import Navbar from './Navbar';
//창고안에 있는 재고들 출력
//최근순 , 상태 순 setstate 에 담
export default function Inventory(props) {
  const [inventoryList, setInventoryList] = useState([]);
 
  //axios
  useEffect(() => {
    axios.defaults.baseURL = "http://13.230.73.69:8080/inventory";
    axios
    //.get(`/warehouse/${warehouseCode}`)
    .get(`/warehouse/GA04`)
      .then((res) => {
       // console.log(res.data, "받아온 데이터");
        setInventoryList(res.data);
        //setInventoryList([...res.data]);
        
    })
    .catch((err) => {console.log(err); });
  }, [])
//console.log(inventoryList);
  // inventoryList.map((inventoryList) => {
    
  // });
  const title = " 제목";
  const subTitle = "부제목";
  return (
    <NativeBaseProvider>
    <Box alignItems="center" marginY={3}>
            <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700"
            }} _web={{
                shadow: 2,
                borderWidth: 0
            }} _light={{
                backgroundColor: "gray.50"
            }}>
                <Stack p="4" space={3}>
                    <Stack space={2}>
                        <Heading size="md" ml="-1">
                            {title}
                        </Heading>
                        <Text fontSize="xs" _light={{
                            color: "violet.500"
                        }} _dark={{
                            color: "violet.400"
                        }} fontWeight="500" ml="-0.5" mt="-1">
                            {subTitle}
                        </Text>
            </Stack>
            
                    <Text fontWeight="400">
                        Bengaluru (also called Bangalore) is the center of India's high-tech
              industry. The city is also known for its parks and nightlife.
              {
                inventoryList.map((inventoryItem) => {
                 
                    {inventoryItem.amount}
                 
                   //console.log(inventoryItem.amount);
                }
              )
              }
            </Text>
            
                </Stack>
            </Box>
      </Box>
      </NativeBaseProvider>
  );
}


