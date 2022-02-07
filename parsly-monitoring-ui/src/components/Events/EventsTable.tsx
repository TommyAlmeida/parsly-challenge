import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Flex,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

import TableEventRow from "components/Events/TableEventsRow";
import { IEventData } from "../../api/services/Events/Types";
import { listEvents } from "../../api/services/Events/EventService";

export const EventsTable = () => {
  const [loadingData, setLoadingData] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5000);
  const [data, setData] = useState<IEventData[]>();

  async function getData() {
    listEvents().then(response => {
      setData(response.data);
      setLoadingData(false);
    });
  }

  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(getData, refreshInterval);
      setLoadingData(true);
      return () => {
        clearInterval(interval);
      };
    }
  }, [refreshInterval]);

  return (
    <>
      {loadingData ? (
        <Flex>
          <Spinner color="blue.500" />
        </Flex>
      ) : (
        <Table variant="simple" color="gray.100">
          <Thead>
            <Tr my=".8rem" pl="0px">
              <Th pl="0px" color="gray.400">
                Events
              </Th>
              <Th color="gray.400">Detail</Th>
              <Th color="gray.400">Severity</Th>
              <Th color="gray.400">Timestamp</Th>
              <Th color="gray.400">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.map((row, index) => {
                return (
                  <TableEventRow
                    isLoading={loadingData}
                    key={`${row.name}-${index}`}
                    name={row.name}
                    detail={row.detail}
                    severity={row.severity}
                    timestamp={row.timestamp}
                    eventObjectId={row.eventObjectId}
                  />
                );
              })}
          </Tbody>
        </Table>
      )}
    </>
  );
};
