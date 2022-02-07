import React from "react";
import { Table, Thead, Tbody, Tr, Th, Flex, Spinner } from "@chakra-ui/react";

import TableEventRow from "components/Events/TableEventsRow";

export const EventsTable = ({ isLoading, data }) => {
  const removeEvent = (rowId: number) => {
    console.log("clicked", rowId);
    if (data) data.filter(row => row.id !== rowId);
  };

  return (
    <>
      {isLoading ? (
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
