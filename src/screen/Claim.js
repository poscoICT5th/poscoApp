// import {View} from 'react-native';
import React from 'react';
import {
  Box,
  Center,
  Heading,
  Input,
  NativeBaseProvider,
  Text,
  VStack,
  Container,
  Divider,
  View,
    Flex,
    TextArea
} from 'native-base';

const Claim = () => {
  return (
    <NativeBaseProvider>
      <View bg="muted.600">
        <Heading color="amber.400" mx="4" mt="3">
          요청사항
        </Heading>

        <Text fontSize="xs" alignItems="center" mx="4" color="amber.50" mt="1">
          *요청사항을 입력해주세요.
        </Text>

        <Flex direction="row-reverse" h="58" p="4">
          <Text color="amber.50" fontSize="sm">posco ict</Text>
          <Divider bg="amber.50" thickness="1" mx="2" orientation="vertical" />
          <Text color="amber.50" fontSize="sm">010-2046-1055</Text>
          <Divider bg="amber.50" thickness="1" mx="2" orientation="vertical" />
          <Text color="amber.50" fontSize="sm">정안지</Text>
        </Flex>
      </View>

      <Center>
        <VStack space={3}>
          <Text fontSize="lg" alignItems="center" mt="4"  mx="3">
            말머리
          </Text>
          <Input mx="3" placeholder="말머리" w="75%" maxWidth="300px" />
          <Text fontSize="lg"  mx="3">제목</Text>
          <Input mx="3" placeholder="제목" w="75%" maxWidth="300px" />
          <Text fontSize="lg" mx="3">
            내용
          </Text>
          <TextArea h={40} placeholder="내용을 입력해주세요." w="80%" maxW="300"  mx="3"
                  />
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
};

export default Claim;
