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
import { Entypo } from "@expo/vector-icons";
const Mypage = () => {
  const [tableHead, setTableHead] = useState([
    'Head',
    'Head2',
    'Head3',
    'Head4',
    'Head5',
    'Head6',
    'Head7',
    'Head8',
    'Head9',
  ]);
  const [widthArr, setWidthArr] = useState([
    40, 60, 80, 100, 120, 140, 160, 180, 200,
  ]);

  const styles = StyleSheet.create({
    container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
    header: {height: 50, backgroundColor: '#79c0f2'},
    text: {textAlign: 'center', fontWeight: '100'},
    dataWrapper: {marginTop: -1},
    row: {height: 40, backgroundColor: '#f0f3f5'},
  });

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
            POSCO ICT
            <Text color="emerald.500"> My page</Text>
            {/* <Text color="#aa23"> My page</Text> */}
          </Heading>
          <Text mt="3" fontWeight="medium">
            오늘도 화이팅 !
          </Text>
          {/* <IconButton icon={<Icon as={Entypo} name="emoji-happy" />} borderRadius="full" _icon={{
      color: "orange.500",
      size: "md"
    }} _hover={{
      bg: "orange.600:alpha.20"
    }} _pressed={{
      bg: "orange.600:alpha.20",
      _icon: {
        name: "emoji-flirt"
      },
      _ios: {
        _icon: {
          size: "2xl"
        }
      }
    }} _ios={{
      _icon: {
        size: "2xl"
      }
    }} /> */}
        </Container>
        {/* 여기부터 회원정보 */}
        <ScrollView w="100%">
          <Stack
            space={2.5}
            alignSelf="center"
            px="4"
            safeArea
            mt="16"
            w={{
              base: '100%',
              md: '25%',
            }}>
            <Box>
              <Text bold fontSize="xl" mb="4">
                Name
              </Text>
              <FormControl mb="5">
                <FormControl.Label>정안지</FormControl.Label>
              </FormControl>
              <Divider />
            </Box>
            <Box>
              <Text bold fontSize="xl" mb="4">
                Phone
              </Text>
              <FormControl mb="5">
                <FormControl.Label>010-2046-1055</FormControl.Label>
              </FormControl>
              <Divider />
            </Box>

            <Box>
              <Text bold fontSize="xl" mb="4">
                Team
              </Text>
              <FormControl mb="5">
                <FormControl.Label>Big Data</FormControl.Label>
              </FormControl>
              <Divider />
            </Box>

            <Box>
              <Text bold fontSize="xl" mb="4">
                Email
              </Text>
              <FormControl mb="5">
                <FormControl.Label>wjddkswl97@gmail.com</FormControl.Label>
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
