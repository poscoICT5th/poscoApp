import React, {useEffect, useState} from 'react';
import axios from 'axios';
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
import MoveModal from './MoveModal';
import Stagger1 from './Stagger1';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Move_third = props => {
  const [doneList, setDoneList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    first();
  }, []);
  //예정인것 , 필터링
  function first() {
    console.log(123123);
    setDoneList([
      ...props.moveList.filter(moveItem => moveItem.status === '이동완료'),
    ]);
  }

  return (
    <NativeBaseProvider>
      <ScrollView>
        {doneList.map(moveItem => {
          return (
            <Box alignItems="center" marginY={3}>
                <TouchableOpacity onPress={() => setShowModal(true)}>
              <Box
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
                      lot_no : {moveItem.lot_no}
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
                      move_amount : {moveItem.move_amount}
                    </Text>
                  </Stack>
                  <Text fontWeight="400">
                    instruction_no : {moveItem.instruction_no}
                  </Text>
                  <Text fontWeight="400">item_code : {moveItem.item_code}</Text>
                  <Text fontWeight="400">item_name : {moveItem.item_name}</Text>
                </Stack>
              </Box>
              <MoveModal
                showModal={showModal}
                setShowModal={setShowModal}
                moveItem={moveItem}
              />
                </TouchableOpacity>
            </Box>
          );
        })}
          
      </ScrollView>
      <Stagger1></Stagger1>
    </NativeBaseProvider>
  );
};

export default Move_third;
