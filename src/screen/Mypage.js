import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Table, TableWrapper, Row} from 'react-native-table-component';
import {
  Container,
  Text,
  Heading,
  Center,
  NativeBaseProvider,
  VStack,
  FormControl,
  Input,
  Stack,
  Divider,
  Box,
  HStack,
  IconButton,
  Flex,
  View,
} from 'native-base';
import useRootData from '../hooks/useRootData';
import jwtDecode from 'jwt-decode';
import InventoryStagger from './InventoryStagger';
import Icon from 'react-native-vector-icons/FontAwesome';



const Mypage = props => {
  const {token} = useRootData(({screenModeStore}) => ({
    token: screenModeStore.token,
  }));

  let userInfo = jwtDecode(token.get().token).info;
  console.log(userInfo);
  // const [tableHead, setTableHead] = useState([
  //   'Head',
  //   'Head2',
  //   'Head3',
  //   'Head4',
  //   'Head5',
  //   'Head6',
  //   'Head7',
  //   'Head8',
  //   'Head9',
  // ]);
  // const [widthArr, setWidthArr] = useState([
  //   40, 60, 80, 100, 120, 140, 160, 180, 200,
  // ]);

  // const styles = StyleSheet.create({
  //   container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  //   header: {height: 50, backgroundColor: '#79c0f2'},
  //   text: {textAlign: 'center', fontWeight: '100'},
  //   dataWrapper: {marginTop: -1},
  //   row: {height: 40, backgroundColor: '#f0f3f5'},
  // });

  const tableData = [];
  for (let i = 0; i < 30; i += 1) {
    const rowData = [];
    for (let j = 0; j < 9; j += 1) {
      rowData.push(`${i}${j}`);
    }
    tableData.push(rowData);
  }
  let now = new Date();
  let month = now.getMonth();
  let date = now.getDate();

  useEffect(() => {
    props.setTitle("마이페이지")
  }, [])
  

  return (
    <NativeBaseProvider>
      <View bg="muted.600">
      <HStack space={3}  mx="8" mt="12" color="amber.400">
      <Icon as={Icon} name="user" size={35} color="white" />
        <Heading color="amber.400"
        >
          마이페이지
          </Heading>
          </HStack>
        <Text
          fontSize="xl"
          alignItems="center"
          mx="8"
          color="amber.50"
          mt="20"
          mb="10"
        >
          {month+1} 월 {date} 일 오늘도 화이팅 !
        </Text>
      </View>

      {/* 여기부터 회원정보 */}
      <Center flex={2} px="20">
        <Stack
          space={12}
          alignSelf="center"
          px="0"
          safeArea
          mt="0"
          w={{
            base: '100%',
            md: '100%',
          }}
          
        >
          <Box w="100%" >
            <Text bold fontSize="2xl" mb="4">
              이름
            </Text>
            <Text fontSize="lg" mb="4">
            {userInfo.name}
            </Text>
            <Divider thickness="2" />
          </Box>
          <Box w="100%">
            <Text bold fontSize="2xl" mb="4">
              전화번호
            </Text>
            <Text fontSize="lg" mb="4">
            {userInfo.phone}
            </Text>
            <Divider  thickness="2"/>
          </Box>

          <Box w="100%">
            <Text bold fontSize="2xl" mb="4">
              담당창고
            </Text>
            <Text fontSize="lg" mb="4">
            {userInfo.team}
            </Text>
            <Divider  thickness="2"/>
          </Box>

          <Box w="100%">
            <Text bold fontSize="2xl" mb="4">
              이메일
            </Text>
            <Text fontSize="lg" mb="4">
            {userInfo.email}
            </Text>
            <Divider  thickness="2"/>
          </Box>
        </Stack>
      </Center>
      <View style={{position: 'absolute', bottom: 0, right: 13}}>
        <InventoryStagger
         navigation={props.navigation}
        />
      </View>
    </NativeBaseProvider>
  );
};

export default Mypage;
