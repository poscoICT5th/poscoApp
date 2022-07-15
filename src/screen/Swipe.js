import React, {useState, useEffect} from 'react';
import {
  NativeBaseProvider,
  Box,
  Text,
  Pressable,
  Heading,
  HStack,
  VStack,
  Spacer,
  Center,
  ScrollView,
} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import axios from 'axios';
import useRootData from '../hooks/useRootData';
import jwtDecode from 'jwt-decode';
import Icon1 from 'react-native-vector-icons/Entypo';

function Swipe(props) {
  const [mode, setMode] = useState('Basic');
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Center h="450" w="780" marginTop={5}>
          <Box
            _dark={{
              bg: 'coolGray.800',
            }}
            _light={{
              bg: 'white',
            }}
            flex="1"
            w="100%">
            <Heading p="4" pb="3" size="lg" color="danger.500">
              My Hotline
            </Heading>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Basic reloadHotline={props.reloadHotline} />
            </ScrollView>
          </Box>
        </Center>
      </Center>
    </NativeBaseProvider>
  );
}
export default Swipe;

function Basic(props) {
  //정보 가져오기
  const [hotlineList, setHotlineList] = useState([]);
  //유저 정보 가져오기
  const {token} = useRootData(({screenModeStore}) => ({
    token: screenModeStore.token,
  }));

  let userInfo = jwtDecode(token.get().token).info;

  useEffect(() => {
    getDatas();
  }, [props.reloadHotline]);

  function getDatas(params) {
    axios.defaults.baseURL = 'http://35.77.54.132:8080/hotline';
    axios
      .get('/writerid/' + userInfo.id)
      .then(res => {
        setHotlineList(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  useEffect(() => {
    getDatas();
  }, []);

  // 개별항목들
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
            <Icon1
              as={Icon1}
              name={
                item.status === '승인'
                  ? 'check'
                  : item.status === '반려'
                  ? 'cross'
                  : 'dots-three-horizontal'
              } //hotline아이콘
              size={40}
              color="black"
              _dark={{
                color: 'warmGray.50',
              }}
            />
            <VStack>
              <Text
                color="coolGray.800"
                _dark={{
                  color: 'warmGray.50',
                }}
                bold>
                {item.title}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}>
                {item.content}
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
              {item.confirm_date}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );
  return (
    <Box bg="white" safeArea flex="2">
      <SwipeListView
        data={hotlineList}
        renderItem={renderItem}
        rightOpenValue={-130}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
      />
    </Box>
  );
}
