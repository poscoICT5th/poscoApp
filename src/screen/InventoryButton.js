import { View, Text , StyleSheet} from 'react-native';
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
import { background } from 'native-base/lib/typescript/theme/styled-system';
//최근 순 , 상태 순
//여기는 안씀
const InventoryButton = props => {
  return (
    <View>
      <HStack space={5} justifyContent="center">
          {props.userWarehouseCode.map((code, i) => {
            return (
              <Button
                key={i}
                size="lg"
                variant="outline"
                borderRadius={20}
                marginTop={5}
                bg="amber.400"
                borderColor="amber.400"
                _text={{
                  color: 'muted.600',
                }}
                onPress={() => {
                  props.setCurWarehouseCode(code);
                }}>
                {code}
              </Button>
            );
          })}
        </HStack>
  
      </View>
  );
};

export default InventoryButton;

