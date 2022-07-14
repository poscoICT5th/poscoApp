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
import { Alert } from 'react-native';

const Claim = (props) => {
  console.log(props)
  const {token} = useRootData(({screenModeStore}) => ({
    token: screenModeStore.token,
  }));

  let userInfo = jwtDecode(token.get().token).info;
  const [hotlineData, setHotlineData] = useState({
    writer: userInfo.name,
    content: '',
    title: '',
    category: '',
    writer_id:userInfo.id,
  });

  function create() {
    axios.defaults.baseURL = 'http://35.77.54.132:8080/hotline';
    axios
      .post('/', hotlineData)
      .then(res => {
        console.log("여기다 여기 여기라고")
        console.log(res)
        console.log(res.data);
        Alert.alert(res.data?"등록되었습니다.":"등록을 실패하였습니다.")
        if (res.data) {
          props.navigation.goBack();
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
  return (
    <NativeBaseProvider>
      <View bg="muted.600">
        <Heading color="amber.400" mx="7" mt="10" fontSize="3xl">
          요청사항
        </Heading>

        <Text fontSize="xl" alignItems="center" mx="7" color="amber.50" mt="5" mb="10">
          *요청사항을 입력해주세요.
        </Text>

        <Flex direction="row-reverse" h="58" p="4" mb="3">
          <Text color="amber.50" fontSize="lg">
            Even Better
          </Text>
          <Divider bg="amber.50" thickness="1" mx="2" orientation="vertical" />
          <Text color="amber.50" fontSize="lg">
            {userInfo.phone}
          </Text>
          <Divider bg="amber.50" thickness="1" mx="2" orientation="vertical" />
          <Text color="amber.50" fontSize="lg">
            {userInfo.name}
          </Text>
        </Flex>
      </View>

      <Center>
        <VStack space={5} mt="10" width="1/2">
          <Text fontSize="xl" alignItems="center" mt="7" mx="3">
            말머리
          </Text>
          <Input
            mx="3"
            placeholder="말머리"
            w="100%"
            // maxWidth="300px"
            fontSize="md"
            onChangeText={text => {
              setHotlineData({...hotlineData, category: text});
            }}
          />
          <Text fontSize="xl" mx="3">
            제목
          </Text>
          <Input
             fontSize="md"
            mx="3"
            placeholder="제목"
            w="100%"
            // maxWidth="300px"
            onChangeText={text => {
              setHotlineData({...hotlineData, title: text});
            }}
          />
          <Text fontSize="xl" mx="3">
            내용
          </Text>
          <TextArea
             fontSize="md"
            h={40}
            placeholder="내용을 입력해주세요."
            w="100%"
            // maxW="300"
            mx="3"
            onChangeText={text => {
              setHotlineData({...hotlineData, content: text});
            }}
          />
          <Button mt="4" onPress={() => create()}
          bg="amber.400" mx="3"
            w="100%"
            size="lg"
            fontSize="lg"
          >
            접수하기
          </Button>
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
};

export default Claim;
