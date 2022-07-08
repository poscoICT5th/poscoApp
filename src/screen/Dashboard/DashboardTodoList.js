import { View } from 'react-native'
import React from 'react'
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider } from "native-base";
const DashboardTodoList = (props) => {
    return (
        <Box alignItems="center" marginY={3}>
            <Box width={80} rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700"
            }} _web={{
                shadow: 2,
                borderWidth: 0
            }} _light={{
                backgroundColor: "gray.50"
            }}>
                <Stack p="4" space={3}>
                    <Stack space={2}>
                        <Heading size="md" ml="-1">
                            {props.title}
                        </Heading>
                        <Text fontSize="xs" _light={{
                            color: "violet.500"
                        }} _dark={{
                            color: "violet.400"
                        }} fontWeight="500" ml="-0.5" mt="-1">
                            {props.subTitle}
                        </Text>
                    </Stack>
                    {/* <Text fontWeight="400">
                        Bengaluru (also called Bangalore) is the center of India's high-tech
                        industry. The city is also known for its parks and nightlife.
                    </Text> */}
                </Stack>
            </Box>
        </Box>
    )
}

export default DashboardTodoList