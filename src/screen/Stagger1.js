import React, { useState } from 'react';
import {
  Box,
  useDisclose,
  IconButton,
  Stagger,
  HStack,
  Center,
  NativeBaseProvider,
} from 'native-base';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const Example = (props) => {
  const { isOpen, onToggle } = useDisclose();
  const [exportList, setExportList] = useState([]);



  const onGetBarcodeExport = (barcodeValue, cmdType) => {
    console.log('barcode value: ', barcodeValue);
    //아래 함수의 파라미터로 문자열만 넘길 수 있음. barcodeValue가 문자열처럼 보이지만 문자열이 아닌 듯. String()는 작동하지 않음. JSON.stringify()는 작동함
    //  Alert.alert("barcode value: ", barcodeValue);
    if (cmdType == 'export') {
      axios.defaults.baseURL = 'http://13.230.30.203:8080';
      axios
        .get('/export/lotno/' + barcodeValue)
        // axios.get("http://13.230.30.203:8080/export/lotno/" +barcodeValue)
        .then(res => {
          console.log(123123123);
          console.log(res.data);
          console.log(res.data.instruction_no);
          axios
            .put('/export/export/' + res.data.instruction_no)
            .then(res2 => {
              Alert.alert('출고 완료되었습니다.');
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(e => {
          console.log(e);
        });
    }
  };


  return (
    <View style={{alignSelf: 'flex-start', alignContent: 'flex-start'}}>
      <Center>
        <Box alignItems="center" minH="110">
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
              bg="indigo.500"
              colorScheme="indigo"
              borderRadius="full"
              icon={<Icon name="delete" size={6} color="#e33057" />}
              // onPress={() =>
              //   props.navigation.navigate('BarcodeScanner', {
              //     onGetBarcode: onGetBarcodeExport,
              //     cmdType: 'export',
              //   })
              // }
            />
            <IconButton
              mb="4"
              size="lg"
              variant="solid"
              bg="indigo.500"
              colorScheme="indigo"
              borderRadius="full"
              icon={<Icon name="circledowno" size={6} color="#3143e8" />}
            />
            {/* <Icon.Button
               mb="4"
               size="lg"
               variant="solid"
               bg="indigo.500"
              colorScheme="indigo"
              borderRadius="full"
              icon={<Icon name="camera" size={6} color="#3143e8" />}
              // onPress={this.loginWithFacebook}
            ></Icon.Button> */}
          </Stagger>
        </Box>
        <HStack alignItems="center">
          <IconButton
            variant="solid"
            borderRadius="full"
            size="lg"
            onPress={onToggle}
            bg="cyan.400"
            icon={<Icon name="circledowno" size={10} color="#3143e8" />}
          />
        </HStack>
      </Center>
    </View>
  );
};


export default () => {
  return (
    <NativeBaseProvider>
      <Example />
    </NativeBaseProvider>
  );
};
