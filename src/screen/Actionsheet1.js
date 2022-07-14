import React from 'react';
import {
  Button,
  Actionsheet,
  useDisclose,
  Text,
  Box,
  Center,
  NativeBaseProvider,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Fontisto';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

function Example(props) {
  const {isOpen, onOpen, onClose} = useDisclose();
  return (
    <Center>
      <Button
        onPress={onOpen}
        size="lg"
        variant="outline"
        borderRadius={20}
        bg="muted.200"
        _text={{
          color: "#1F2937",
          fontSize: "lg"
        }} 
        
        borderColor="muted.200"
        mt={3}
        width={200}
      >
        정렬
      </Button>

      <Actionsheet isOpen={isOpen} onClose={onClose} w="100%" alignSelf="auto">
        <Actionsheet.Content>
          <Box w="90%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: 'gray.300',
              }}>
              정렬
            </Text>
          </Box>
          <Actionsheet.Item
            startIcon={<Icon1 as={Icon1} name="date" size={20} color="black" />}
            onPress={() => {
              props.sortDate();
              onClose();
            }}
            w="90%">
            날짜순
          </Actionsheet.Item>
          <Actionsheet.Item
            startIcon={
              <Icon as={Icon} name="smile-o" size={20} color="black" />
            }
            onPress={() => {
              props.sortState();
              onClose();
            }}
            w="90%"
          >
            상태순
          </Actionsheet.Item>
          <Actionsheet.Item
            startIcon={
              <Icon2 as={Icon2} name="factory" size={20} color="black" />
            }
            onPress={() => {
              props.sortProduct();
              onClose();
            }}
            w="90%"
            mb="3"
          >
            제품군순
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
}

export default props => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Example sortDate={props.sortDate} sortState={props.sortState} />
      </Center>
    </NativeBaseProvider>
  );
};
