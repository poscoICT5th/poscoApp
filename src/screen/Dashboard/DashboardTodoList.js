import { Alert, View } from 'react-native'
import React from 'react'
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider } from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler';
const DashboardTodoList = (props) => {
    return (
        <Box alignItems="center" marginY={3} >
            <TouchableOpacity onPress={() => { props.navigation.navigate(props.navigate) }}>
                <Box w="600" rounded="lg" overflow="hidden" borderColor="coolGray.100" borderWidth="1"
                   
                    mt="5"
                    _dark={{
                    borderColor: "coolGray.100",
                    backgroundColor: "amber.500"
                }} _web={{
                    shadow: 2,
                    borderWidth: 0
                }} _light={{
                    backgroundColor: "gray.50"
                }}>
                    <Stack p="4" space={3} >
                        <Stack space={2}>
                            <Heading size="md" ml="-1"
                           color="muted.700"
                            >
                                {props.title}
                            </Heading>
                            <Text fontSize="xs" _light={{
                                color: "amber.500"
                            }} _dark={{
                                color: "amber.400"
                            }} fontWeight="500" ml="-0.5" mt="-1"
                            >
                                {props.subTitle}
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </TouchableOpacity>
        </Box>
     
  );
};

export default DashboardTodoList;
