import React from "react";
import DetailCard from "./DetailCard";
import Text from "./Text";

import Status from "./Status";

/**
 * EquipmentInfo component that displays equipment information.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.data - Object containing the equipment data.
 * @param {string} props.data.modelName - The model name of the equipment.
 * @param {string} props.data.actualState - The current state of the equipment.
 * @param {string} props.data.colorState - The color representing the current state of the equipment.
 * @returns {JSX.Element}
 */
function EquipmentInfo({ data }) {
  return (
    <DetailCard title="Informações">
      <Text>{data.modelName}</Text>

      <Status state={data.actualState} color={data.colorState}></Status>
    </DetailCard>
  );
}

export default EquipmentInfo;
