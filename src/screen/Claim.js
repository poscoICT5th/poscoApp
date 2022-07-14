// import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Box,
  Center,
  Heading,
  Input,
  NativeBaseProvider,
  Text,
  VStack,
  Container,
  Divider,
  View,
  Flex,
  TextArea,
  Button,
} from 'native-base';
import useRootData from '../hooks/useRootData';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {create} from 'react-test-renderer';

const Claim = () => {
  const {token} = useRootData(({screenModeStore}) => ({
    token: screenModeStore.token,
  }));

  let userInfo = jwtDecode(token.get().token).info;
  const [hotlineData, setHotlineData] = useState({
    writer: userInfo.name,
    content: '',
    title: '',
    category: '',
  });

  function create() {
    axios.defaults.baseURL = 'http://192.168.0.10:8088';
    axios
      .post('/', hotlineData)
      .then(res => {
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  return (
    <NativeBaseProvider>
      <View bg="muted.600">
        <Heading color="amber.400" mx="4" mt="4">
          요청사항
        </Heading>

        <Text fontSize="xs" alignItems="center" mx="4" color="amber.50" mt="1">
          *요청사항을 입력해주세요.
        </Text>

        <Flex direction="row-reverse" h="58" p="4">
          <Text color="amber.50" fontSize="sm">
            POSCO ICT
          </Text>
          <Divider bg="amber.50" thickness="1" mx="2" orientation="vertical" />
          <Text color="amber.50" fontSize="sm">
            {userInfo.phone}
          </Text>
          <Divider bg="amber.50" thickness="1" mx="2" orientation="vertical" />
          <Text color="amber.50" fontSize="sm">
            {userInfo.name}
          </Text>
        </Flex>
      </View>

      <Center>
        <VStack space={3}>
          <Text fontSize="lg" alignItems="center" mt="4" mx="3">
            말머리
          </Text>
          <Input
            mx="3"
            placeholder="말머리"
            w="75%"
            maxWidth="300px"
            onChangeText={text => {
              setHotlineData({...hotlineData, category: text});
            }}
          />
          <Text fontSize="lg" mx="3">
            제목
          </Text>
          <Input
            mx="3"
            placeholder="제목"
            w="75%"
            maxWidth="300px"
            onChangeText={text => {
              setHotlineData({...hotlineData, title: text});
            }}
          />
          <Text fontSize="lg" mx="3">
            내용
          </Text>
          <TextArea
            h={40}
            placeholder="내용을 입력해주세요."
            w="80%"
            maxW="300"
            mx="3"
            onChangeText={text => {
              setHotlineData({...hotlineData, content: text});
            }}
          />
          <Button mt="4" onPress={() => create()} bg="amber.400" mx="3">
            접수하기
          </Button>
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
};

export default Claim;
