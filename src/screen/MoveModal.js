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
      <Modal
        isOpen={props.showModal}
        onClose={() => props.setShowModal(false)}
        size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>{props.moveItem.status}</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">from_warehouse</Text>
                <Text color="blueGray.400">
                  {props.moveItem.from_warehouse}
                </Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">to_warehouse</Text>
                <Text color="blueGray.400">{props.moveItem.to_warehouse}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">move_amount</Text>
                <Text color="blueGray.400">{props.moveItem.move_amount}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">width</Text>
                <Text color="blueGray.400">{props.moveItem.width}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">weight</Text>
                <Text color="blueGray.400">{props.moveItem.weight}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">height</Text>
                <Text color="blueGray.400">{props.moveItem.height}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">unit</Text>
                <Text color="blueGray.400">{props.moveItem.unit}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">location</Text>
                <Text color="blueGray.400">{props.moveItem.location}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">inst_deadline</Text>
                <Text color="blueGray.400">{props.moveItem.inst_deadline}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">inst_reg_date</Text>
                <Text color="blueGray.400">{props.moveItem.inst_reg_date}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">done_date</Text>
                <Text color="blueGray.400">{props.moveItem.done_date}</Text>
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
