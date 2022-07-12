import {View, Text} from 'react-native';
import React from 'react';
import Navbar from './Navbar';
import {
  Box,
  Center,
  Checkbox,
  Container,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  NativeBaseProvider,
  useToast,
  VStack,
} from 'native-base';

export default function Example({navigation, route}) {
  const instState = [
    {
      title: 'Code',
      isCompleted: true,
    },
    {
      title: 'Meeting with team at 9',
      isCompleted: false,
    },
    {
      title: 'Check Emails',
      isCompleted: false,
    },
    {
      title: 'Write an article',
      isCompleted: false,
    },
  ];
  const [list, setList] = React.useState(instState);
  const [inputValue, setInputValue] = React.useState('');
  const toast = useToast();

  const addItem = title => {
    if (title === '') {
      toast.show({
        title: 'Please Enter Text',
        status: 'warning',
      });
      return;
    }

    setList(prevList => {
      return [
        ...prevList,
        {
          title: title,
          isCompleted: false,
        },
      ];
    });
  };

  const handleDelete = index => {
    setList(prevList => {
      const temp = prevList.filter((_, itemI) => itemI !== index);
      return temp;
    });
  };

  const handleStatusChange = index => {
    setList(prevList => {
      const newList = [...prevList];
      newList[index].isCompleted = !newList[index].isCompleted;
      return newList;
    });
  };

const TodoList = () => {
  return (
    <ScrollView>
      <View>
        <Box alignItems="center" marginTop={5}>
          <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
          }} _web={{
            shadow: 2,
            borderWidth: 0
          }} _light={{
            backgroundColor: "gray.50"
          }}>
            <Box>
              <AspectRatio w="100%" ratio={16 / 9}>
                <Image source={{
                  uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
                }} alt="image" />
              </AspectRatio>
              <Center bg="violet.500" _dark={{
                bg: "violet.400"
              }} _text={{
                color: "warmGray.50",
                fontWeight: "700",
                fontSize: "xs"
              }} position="absolute" bottom="0" px="3" py="1.5">
                PHOTOS
              </Center>
            </Box>
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1">
                  The Garden City
                </Heading>
                <Text fontSize="xs" _light={{
                  color: "violet.500"
                }} _dark={{
                  color: "violet.400"
                }} fontWeight="500" ml="-0.5" mt="-1">
                  The Silicon Valley of India.
                </Text>
              </Stack>
              <HStack alignItems="center" space={4} justifyContent="space-between">
                <HStack alignItems="center">
                  <Text color="coolGray.600" _dark={{
                    color: "warmGray.200"
                  }} fontWeight="400">
                    6 mins ago
                  </Text>
                </HStack>
              </HStack>
            </Stack>
          </Box>
        </Box>
      </View>
    </ScrollView>
  )
}

export default TodoList