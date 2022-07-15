import {View} from 'react-native';
import React from 'react';
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
  Modal,
  VStack,
  Button,
} from 'native-base';
const InventoryModal = props => {
  return (
    <View>
      <Button
        // color="muted.800"
        bgColor="muted.700"
       _text={{
        color: 'muted.50'
      }} 
        onPress={() => {
          props.setShowModal(true);
        }}>
        자세히보기
      </Button>
      <Modal
        isOpen={props.showModal}
        onClose={() => props.setShowModal(false)}
        size="xl"
      >
        <Modal.Content width="80%">
          <Modal.CloseButton />
          <Modal.Header>Order</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">customer</Text>
                <Text color="blueGray.400">{props.inventoryItem.customer}</Text>
              </HStack>

              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">height</Text>
                <Text color="blueGray.400">{props.inventoryItem.height}</Text>
              </HStack>

              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">location</Text>
                <Text color="blueGray.400">{props.inventoryItem.location}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">industry_family</Text>
                <Text color="blueGray.400">
                  {props.inventoryItem.industry_family}
                </Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">product_family</Text>
                <Text color="blueGray.400">
                  {props.inventoryItem.product_family}
                </Text>
              </HStack>

              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">status_cause</Text>
                <Text color="blueGray.400">
                  {props.inventoryItem.status_cause}
                </Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">stock_quality_status</Text>
                <Text color="blueGray.400">
                  {props.inventoryItem.stock_quality_status}
                </Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">stock_type</Text>
                <Text color="blueGray.400">
                  {props.inventoryItem.stock_type}
                </Text>
              </HStack>
            </VStack>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default InventoryModal;
