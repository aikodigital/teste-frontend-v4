import React from "react";
import { Flex } from "@chakra-ui/react";
import { Timeline } from "@chakra-ui/react";
import DetailCard from "./DetailCard";

/**
 * EquipmentStateHistory component that displays a timeline of equipment state history.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.data - Data object containing the state history details.
 * @param {Array<Object>} props.data.stateHistoryDetails - Array of state history detail objects.
 * @param {string} props.data.stateHistoryDetails[].color - The color for the timeline indicator.
 * @param {string} props.data.stateHistoryDetails[].name - The name of the equipment state.
 * @param {string} props.data.stateHistoryDetails[].date - The date when the state was recorded.
 * @returns {JSX.Element}
 */
function EquipmentStateHistory({ data }) {
  return (
    <DetailCard title="Estados">
      <Flex h="100%" overflow={"auto"}>
        <Timeline.Root>
          {data.stateHistoryDetails.map((el, index) => (
            <Timeline.Item key={index}>
              <Timeline.Connector>
                <Timeline.Separator />
                <Timeline.Indicator bg={el.color} />
              </Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title>{el.name}</Timeline.Title>
                <Timeline.Description>{el.date}</Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline.Root>
      </Flex>
    </DetailCard>
  );
}

export default EquipmentStateHistory;
