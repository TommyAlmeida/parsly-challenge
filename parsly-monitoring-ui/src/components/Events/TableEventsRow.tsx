import React from "react";
import moment from "moment";
import {
  Tr,
  Td,
  Flex,
  Text,
  useColorModeValue,
  IconButton,
  Button,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import { EventSeverity } from "../../api/services/Events/Types";
import { EventSeverityTag } from "components/Events/EventSeverityTag";
import EventDetailsModal from "components/Events/EventDetailsModal";
import { CheckIcon } from "@chakra-ui/icons";
import { FaEllipsisV } from "react-icons/fa";

interface TableEventRowProps {
  isLoading: boolean;
  name: string;
  detail: string;
  timestamp: Date;
  severity: typeof EventSeverity | string;
  eventObjectId: number;
}

function TableEventRow(props: TableEventRowProps) {
  const { name, detail, timestamp, severity, eventObjectId } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tr key={name}>
        <Td minWidth={{ sm: "250px" }} pl="0px">
          <Flex
            alignItems="center"
            py=".8rem"
            minWidth="100%"
            flexWrap="nowrap"
          >
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {name}
            </Text>
          </Flex>
        </Td>
        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {detail}
          </Text>
        </Td>
        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            <EventSeverityTag severity={severity} />
          </Text>
        </Td>
        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {moment(new Date(timestamp)).format("MMM Do YYYY hh:mm A")}
          </Text>
        </Td>
        <Td>
          <Button
            bg="transparent"
            rightIcon={
              <Icon as={FaEllipsisV} color="gray.400" cursor="pointer" />
            }
            color={textColor}
            onClick={onOpen}
          >
            Show Details
          </Button>
          <Button rightIcon={<CheckIcon />} ml={4} colorScheme="green">
            Correct
          </Button>
        </Td>
      </Tr>

      <EventDetailsModal
        isOpen={isOpen}
        onClose={onClose}
        key={`event-object-${eventObjectId}`}
        eventObjectId={eventObjectId}
        details={detail}
      />
    </>
  );
}

export default TableEventRow;
