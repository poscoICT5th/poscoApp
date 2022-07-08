import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  Divider,
  Heading,
  VStack,
  Stack,
  ScrollView,
  Center,
  NativeBaseProvider,
  HStack,
} from 'native-base';
//최근 순 , 상태 순
const InventoryButton = props => {
  return (
    <NativeBaseProvider>
      <Center flex={3} px="3">
        <HStack space={2} justifyContent="center">
          <Button
            size="sm"
            variant="ghost"
            onPress={() => {
              props.sortDate();
            }}>
            SortDate
          </Button>
          <Button
            size="sm"
            variant="ghost"
            colorScheme="secondary"
            onPress={() => {
              props.sortState();
            }}>
            SortState
          </Button>
        </HStack>
      </Center>
    </NativeBaseProvider>
  );
};

export default InventoryButton;
