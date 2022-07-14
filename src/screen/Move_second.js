import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {ListItem} from '@react-native-material/core';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
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

const Move_second = props => {
  const [showModal, setShowModal] = useState(false);
  const [doneList, setDoneList] = useState([]);

  useEffect(() => {
    first();
  }, []);
  //예정인것 , 필터링
  function first() {
    setDoneList([
      ...props.moveList.filter(moveItem => moveItem.status === '이동중'),
    ]);
  }

  return (
    <NativeBaseProvider>
      <ScrollView>
        {doneList.map(moveItem => {
          return (
            <Box alignItems="center" marginY={6}>
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <Box
                  width="600"
                  rounded="lg"
                  overflow="hidden"
                  borderColor="coolGray.100"
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
                          color: 'amber.500',
                        }}
                        _dark={{
                          color: 'amber.500',
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
                    <Text fontWeight="400">
                      item_code : {moveItem.item_code}
                    </Text>
                    <Text fontWeight="400">
                      item_name : {moveItem.item_name}
                    </Text>
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
      <View style={{position: 'absolute', bottom: 0, right: 13}}>
        <Stagger1
          title="move"
          onGetBarcode={props.onGetBarcodeMove}
          navigation={props.navigation}
        />
      </View>
    </NativeBaseProvider>
  );
};

export default Move_second;
