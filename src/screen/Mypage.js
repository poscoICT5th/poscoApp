import React, {useState} from 'react';
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
  Icon,
  IconButton,
  Flex,
  View,
} from 'native-base';
import useRootData from '../hooks/useRootData';
import jwtDecode from 'jwt-decode';
import InventoryStagger from './InventoryStagger';

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

  return (
    <NativeBaseProvider>
      <View bg="muted.600">
        <Heading color="amber.400" mx="4" mt="8">
          마이페이지
        </Heading>
        <Text
          fontSize="xs"
          alignItems="center"
          mx="5"
          color="amber.50"
          mt="10"
          mb="7">
          오늘도 화이팅 !
        </Text>
      </View>

      {/* 여기부터 회원정보 */}
      <Center flex={1} px="12">
        <Stack
          space={2.5}
          alignSelf="center"
          px="0"
          safeArea
          mt="11"
          w={{
            base: '100%',
            md: '100%',
          }}>
          <Box>
            <Text bold fontSize="xl" mb="4">
              이름
            </Text>
            <FormControl mb="5">
              <FormControl.Label>{userInfo.name}</FormControl.Label>
            </FormControl>
            <Divider thickness="1" />
          </Box>
          <Box>
            <Text bold fontSize="xl" mb="4">
              전화번호
            </Text>
            <FormControl mb="5">
              <FormControl.Label>{userInfo.phone}</FormControl.Label>
            </FormControl>
            <Divider />
          </Box>

          <Box>
            <Text bold fontSize="xl" mb="4">
              담당창고
            </Text>
            <FormControl mb="5">
              <FormControl.Label>{userInfo.team}</FormControl.Label>
            </FormControl>
            <Divider />
          </Box>

          <Box>
            <Text bold fontSize="xl" mb="4">
              이메일
            </Text>
            <FormControl mb="5">
              <FormControl.Label>{userInfo.email}</FormControl.Label>
            </FormControl>
            <Divider />
          </Box>
        </Stack>
      </Center>
      <View style={{position: 'absolute', bottom: 0, right: 13}}>
        <InventoryStagger
        // title="move"
        // onGetBarcode={props.onGetBarcodeMove}
         navigation={props.navigation}
        />
      </View>
    </NativeBaseProvider>
  );
};

export default Mypage;
