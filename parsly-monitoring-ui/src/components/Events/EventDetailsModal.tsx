import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Tag,
} from "@chakra-ui/react";
import { IEventObject } from "../../api/services/Events/Types";
import React, { useEffect, useState } from "react";
import { findObjectById } from "../../api/services/Events/EventService";

function EventDetailsModal({ eventObjectId, details }) {
  const [loadingData, setLoadingData] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<IEventObject>();

  useEffect(() => {
    async function getData() {
      findObjectById(eventObjectId).then(response => {
        setData(response.data);
        setLoadingData(false);
      });
    }

    if (loadingData) {
      getData();
    }
  });

  return (
    <>
      <Button
        bg={"gray.400"}
        color={"white"}
        _hover={{
          bg: "gray.600",
        }}
        onClick={onOpen}
      >
        Show Details
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{data?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              Occured on <Tag>{data?.type}</Tag>
            </Text>

            <Text fontWeight="normal" mb="1rem">
              {details}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EventDetailsModal;
