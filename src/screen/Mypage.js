import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
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
  IconButton
} from 'native-base';
import useRootData from '../hooks/useRootData';
import jwtDecode from 'jwt-decode';

const Mypage = () => {
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
      <Center flex={1} px="3">
        <Container>
          <Heading mt="6">
            EvenBetter
            <Text color="emerald.500"> My page</Text>
            {/* <Text color="#aa23"> My page</Text> */}
          </Heading>
          <Text mt="3" fontWeight="medium">
            오늘도 화이팅 !
          </Text>
          
        </Container>
        {/* 여기부터 회원정보 */}
        <ScrollView >
          <Stack
            space={2.5}
            alignSelf="center"
            px="0"
            safeArea
            mt="16"
            w={{
              base: '100%',
              md: '100%',
            }}>
            <Box>
              <Text bold fontSize="xl" mb="4">
                Name
              </Text>
              <FormControl mb="5">
                <FormControl.Label>{userInfo.name}</FormControl.Label>
              </FormControl>
              <Divider />
            </Box>
            <Box>
              <Text bold fontSize="xl" mb="4">
                Phone
              </Text>
              <FormControl mb="5">
                <FormControl.Label>{userInfo.phone}</FormControl.Label>
              </FormControl>
              <Divider />
            </Box>

            <Box>
              <Text bold fontSize="xl" mb="4">
                Team
              </Text>
              <FormControl mb="5">
                <FormControl.Label>{userInfo.team}</FormControl.Label>
              </FormControl>
              <Divider />
            </Box>

            <Box>
              <Text bold fontSize="xl" mb="4">
                Email
              </Text>
              <FormControl mb="5">
                <FormControl.Label>{userInfo.email}</FormControl.Label>
              </FormControl>
              <Divider />
            </Box>
          </Stack>
        </ScrollView>
        ;
      </Center>
    </NativeBaseProvider>
  );
};

export default Mypage;
