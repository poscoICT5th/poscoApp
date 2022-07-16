import React, {useState, na} from 'react';
import {
  Box,
  useDisclose,
  IconButton,
  Stagger,
  HStack,
  Center,
  NativeBaseProvider,
  View,
} from 'native-base';
import {StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import axios from 'axios';
import {Button} from '@react-native-material/core';

const Example = props => {
  const {isOpen, onToggle} = useDisclose();
  const [exportList, setExportList] = useState([]);
  return (
    // <View style={{alignSelf: 'flex-end', alignContent: 'flex-end', marginRight: 13,}}>
    <Center marginRight="7">
      <Box alignItems="center" minH="50">
        <Stagger
          visible={isOpen}
          initial={{
            opacity: 0,
            scale: 0,
            translateY: 34,
          }}
          animate={{
            translateY: 0,
            scale: 1,
            opacity: 1,
            transition: {
              type: 'spring',
              mass: 0.8,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
          exit={{
            translateY: 34,
            scale: 0.5,
            opacity: 0,
            transition: {
              duration: 100,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}>
          <IconButton
            mb="4"
            size="lg"
            variant="solid"
            bg="red.400"
            colorScheme="indigo"
            borderRadius="full"
            icon={
              <Icon1
                as={Icon1}
                name="phone" //hotline아이콘
                size={40}
                color="black"
                _dark={{
                  color: 'warmGray.50',
                }}
              />
            }
            onPress={() =>
              props.navigation.navigate('Claim', {navigation: props.navigation})
            }
          />
        </Stagger>
      </Box>
      <HStack alignItems="center">
        <IconButton
          mb="4"
          // variant="solid"
          borderRadius="full"
          size="lg"
          onPress={onToggle}
          // bg="blue"
          // colorScheme="gray"
          variant="ghost"
          icon={
            <Icon2
              as={Icon2}
              name="plus-box-multiple-outline"
              size={40}
              color="black"
              // _dark={{
              //   color: 'warmGray.50',
              // }}
            />
          }
        />
      </HStack>
    </Center>
    // </View>
  );
};

export default Example;
