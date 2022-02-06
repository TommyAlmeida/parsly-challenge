import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Flex,
  Button,
  Select,
} from "@chakra-ui/react";

import TableEventRow from "components/Events/TableEventsRow";
import { IEventData } from "../../api/services/Events/Types";
import {
  listEvents,
  generateRandomEvent,
} from "../../api/services/Events/EventService";

const Dashboard = () => {
  const [refreshInterval, setRefreshInterval] = useState(1000);
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState<IEventData[]>();

  useEffect(() => {
    async function getData() {
      listEvents().then(response => {
        setData(response.data);
        setLoadingData(false);
      });
    }

    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(getData, refreshInterval);
      setLoadingData(true);

      console.log("refresing");
      return () => clearInterval(interval);
    }

    if (loadingData) {
      getData();
    }
  }, [refreshInterval]);

  return (
    <>
      <Flex justifyContent="space-between" m={4} alignItems="center">
        <Flex>
          <Button onClick={async () => await generateRandomEvent()}>
            Generate Random Events
          </Button>
        </Flex>

        <Flex>
          <Select
            value={refreshInterval}
            onChange={e => {
              setRefreshInterval(Number(e.target.value) * 1000);
            }}
          >
            {[5, 10, 20].map(interval => (
              <option key={interval} value={interval}>
                Refresh in {interval}s
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
      <Flex p="4">
        {loadingData ? (
          <p>Loading Please wait...</p>
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
      </Flex>
    </>
  );
};

export default Dashboard;
