import { Tag } from "@chakra-ui/react";
import { EventSeverity } from "../../api/services/Events/Types";
import React from "react";

export const EventSeverityTag = ({ severity }) => {
  function determineSeverityColor() {
    switch (severity) {
      case EventSeverity.Error:
        return "orange.400";

      case EventSeverity.Warning:
        return "blue.400";

      case EventSeverity.Critical:
        return "red.400";
    }
  }

  return (
    <Tag bgColor={determineSeverityColor()} fontWeight="bold" textColor="white">
      {severity}
    </Tag>
  );
};
