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
      <Button onPress={onOpen} size="md" variant="ghost">
        Sort
      </Button>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: 'gray.300',
              }}>
              Sort
            </Text>
          </Box>
          <Actionsheet.Item
             startIcon={ 
              <Icon1 as={Icon1} 
              name="date"
              size={20}
              color="black" />
            }
            onPress={() => {
              props.sortDate();
              onClose();
            }}>
            Date
          </Actionsheet.Item>
          <Actionsheet.Item
           startIcon={ 
            <Icon as={Icon} 
            name="smile-o"
            size={20}
            color="black" />
          }
          onPress={() => {
            props.sortState();
            onClose();
          }}
          >State</Actionsheet.Item>
          <Actionsheet.Item
           startIcon={ 
            <Icon2 as={Icon2} 
            name="factory"
            size={20}
            color="black" />
          }
          onPress={() => {
            props.sortProduct();
            onClose();
          }}
          >Product_Family</Actionsheet.Item>
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
