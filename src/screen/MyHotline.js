import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {
  NativeBaseProvider,
  Box,
  Pressable,
  Heading,
  IconButton,
  Icon,
  HStack,
  Avatar,
  VStack,
  Spacer,
  Center,
  ScrollView,
} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import axios from 'axios';
import useRootData from '../hooks/useRootData';
import jwtDecode from 'jwt-decode';

const MyHotline = () => {
  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      asdfasdf: 'Afreen Khan',
      timeStamp: '12:47 PM',
      recentText: 'Good Day!',
      avatarUrl:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
  ];
  const renderItem = ({item, index}) => (
    <Box>
      <Pressable
        onPress={() => console.log('You touched me')}
        _dark={{
          bg: 'coolGray.800',
        }}
        _light={{
          bg: 'white',
        }}>
        <Box pl="4" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            <Avatar
              size="48px"
              source={{
                uri: item.avatarUrl,
              }}
            />
            <VStack>
              <Text
                color="coolGray.800"
                _dark={{
                  color: 'warmGray.50',
                }}
                bold>
                {item.asdfasdf}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}>
                {item.recentText}
              </Text>
            </VStack>
            <Spacer />
            <Text
              fontSize="xs"
              color="coolGray.800"
              _dark={{
                color: 'warmGray.50',
              }}
              alignSelf="flex-start">
              {item.timeStamp}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );
  return (
    <Box bg="white" safeArea flex="2">
      <SwipeListView
        data={data}
        //data={hotlineList}
        renderItem={renderItem}
        // renderHiddenItem={renderHiddenItem}
        rightOpenValue={-130}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        // onRowDidOpen={onRowDidOpen}
      />
    </Box>
  );
};

export default MyHotline;
