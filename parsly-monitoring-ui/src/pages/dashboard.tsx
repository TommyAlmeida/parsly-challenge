import React, { useEffect, useState } from "react";
import {
  Flex,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Tag,
  Select,
} from "@chakra-ui/react";

import {
  generateRandomEvent,
  listEvents,
} from "../api/services/Events/EventService";
import { IEventData } from "../api/services/Events/Types";
import { EventsTable } from "components/Events/EventsTable";

import asAuthenticatedRoute from "components/Auth/AutheticatedRoute/AuthenticatedRoute";
import { LineChart } from "components/Charts/LineChart";
const DashboardPage = () => {
  const [loadingData, setLoadingData] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5000);
  const [data, setData] = useState<IEventData[]>();

  async function getData() {
    listEvents().then(response => {
      setData(response.data);
      console.log(response.data);
      setLoadingData(false);
    });
  }

  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(getData, refreshInterval);
      return () => {
        clearInterval(interval);
      };
    }
  }, [refreshInterval]);

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
              <StatLabel>MTTR</StatLabel>
              <StatNumber color="red.400">10.75 Hours</StatNumber>
              <StatHelpText
                alignSelf="flex-end"
                justifySelf="flex-end"
                fontWeight="bold"
                fontSize="md"
              >
                <Tag>Internal</Tag>
              </StatHelpText>
            </Stat>
          </Flex>
          <Flex flexDirection="row" align="center" justify="center" w="100%">
            <Stat>
              <StatLabel>RPO</StatLabel>
              <StatNumber color="green.400">2.15 Hours</StatNumber>
              <StatHelpText
                alignSelf="flex-end"
                justifySelf="flex-end"
                fontWeight="bold"
                fontSize="md"
              >
                <Tag>Internal</Tag>
              </StatHelpText>
            </Stat>
          </Flex>
        </SimpleGrid>
      </Flex>
      <Flex justifyContent="space-between" m={4} alignItems="center">
        <Flex>
          <Button onClick={async () => await generateRandomEvent()}>
            Generate Random Events
          </Button>
        </Flex>
      </Flex>
      <Flex m={10}>
        <EventsTable isLoading={loadingData} data={data} />
      </Flex>
    </>
  );
};

export default asAuthenticatedRoute(DashboardPage);
