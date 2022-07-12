import React from "react";
import { Button, Actionsheet, useDisclose, Text, Box, Center, NativeBaseProvider } from "native-base";

function Example(props) {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  return (
  
    <Center>
      <Button onPress={onOpen}>Sort</Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text fontSize="16" color="gray.500" _dark={{
              color: "gray.300"
            }}>
              Sort
            </Text>
          </Box>
          <Actionsheet.Item
            onPress={() => {
              props.sortDate();
            }}
        
        >SortDate</Actionsheet.Item>
        <Actionsheet.Item>sortState</Actionsheet.Item>
        <Actionsheet.Item>state별로</Actionsheet.Item>
        <Actionsheet.Item>제품군별로</Actionsheet.Item>
          
      </Actionsheet.Content>
    </Actionsheet>
    </Center >
);
};

    export default (props) => {
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
              <Example
               sortDate={props.sortDate}
               sortState={props.sortState}
              />
            </Center>
          </NativeBaseProvider>
        );
    };
    