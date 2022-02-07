import React from "react";
import {
  Flex,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Tag,
} from "@chakra-ui/react";

import { generateRandomEvent } from "../api/services/Events/EventService";
import { EventsTable } from "components/Events/EventsTable";

import asAuthenticatedRoute from "components/Auth/AutheticatedRoute/AuthenticatedRoute";
import { RepeatIcon } from "@chakra-ui/icons";
const DashboardPage = () => {
  return (
    <>
      <Flex flexDirection="column" m={10}>
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="14px">
          <Flex flexDirection="row" align="center" justify="center" w="100%">
            <Stat>
              <StatLabel>Uptime</StatLabel>
              <StatNumber color="green.400">99.28%</StatNumber>
              <StatHelpText
                alignSelf="flex-end"
                justifySelf="flex-end"
                fontWeight="bold"
                fontSize="md"
              >
                <Tag>Global</Tag>
              </StatHelpText>
            </Stat>
          </Flex>
          <Flex flexDirection="row" align="center" justify="center" w="100%">
            <Stat>
              <StatLabel>Daytime Incidents</StatLabel>
              <StatNumber color="red.400">1.03K</StatNumber>
              <StatHelpText
                alignSelf="flex-end"
                justifySelf="flex-end"
                fontWeight="bold"
                fontSize="md"
              >
                <Tag>PagerDuty</Tag>
              </StatHelpText>
            </Stat>
          </Flex>
          <Flex flexDirection="row" align="center" justify="center" w="100%">
            <Stat>
              <StatLabel>Global Uptime</StatLabel>
              <StatNumber>99.28%</StatNumber>
              <StatHelpText
                alignSelf="flex-end"
                justifySelf="flex-end"
                color="green.400"
                fontWeight="bold"
                fontSize="md"
              >
                +15%
              </StatHelpText>
            </Stat>
          </Flex>
          <Flex flexDirection="row" align="center" justify="center" w="100%">
            <Stat>
              <StatLabel>Global Uptime</StatLabel>
              <StatNumber>99.28%</StatNumber>
              <StatHelpText
                alignSelf="flex-end"
                justifySelf="flex-end"
                color="green.400"
                fontWeight="bold"
                fontSize="md"
              >
                +15%
              </StatHelpText>
            </Stat>
          </Flex>
        </SimpleGrid>
      </Flex>
      <Flex m={10}>
        <Flex justifyContent="space-between" m={10} alignItems="center">
          <Flex>
            <Button onClick={async () => await generateRandomEvent()}>
              Generate Random Events
            </Button>
          </Flex>

          <Flex>
            <Button rightIcon={<RepeatIcon />} ml={4}>
              Refresh
            </Button>
          </Flex>
        </Flex>
        <EventsTable />
      </Flex>
    </>
  );
};

export default asAuthenticatedRoute(DashboardPage);
