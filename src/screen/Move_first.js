import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {ListItem} from '@react-native-material/core';
import {StyleSheet, ScrollView, StatusBar, Alert} from 'react-native';
import {
  View,
  Box,
  Heading,
  Text,
  Stack,
  NativeBaseProvider,
  Modal,

} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Stagger1 from './Stagger1';
import MoveModal from './MoveModal';
const Move_first = props => {
  const [doneList, setDoneList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    first();
  }, []);
  //예정인것 , 필터링
  function first() {
    setDoneList([
      ...props.moveList.filter(moveItem => moveItem.status === '이동예정'),
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
                      제품코드 : {moveItem.item_code}
                    </Text>
                    <Text fontWeight="400">
                      제품이름 : {moveItem.item_name}
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

export default Move_first;
