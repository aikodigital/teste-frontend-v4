import React from "react";
import { Stack, Center, Separator } from "@chakra-ui/react";
import Link from "./Link";
import Status from "./Status";
import Text from "./Text";

/**
 * EquipmentPopup component that displays detailed information about an equipment
 * in the main map.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.equipment - The equipment object containing details.
 * @param {string} props.equipment.equipmentName - The name of the equipment.
 * @param {string} props.equipment.modelName - The model name of the equipment.
 * @param {string} props.equipment.colorState - The color representing the equipment's current state.
 * @param {string} props.equipment.actualState - The current state of the equipment.
 * @param {string|number} props.equipment.equipmentId - The unique identifier of the equipment.
 * @returns {JSX.Element}
 */
function EquipmentPopup({ equipment }) {
  return (
    <Stack>
      <Text variant="titleSmall">{equipment.equipmentName}</Text>

      <Text>{equipment.modelName}</Text>

      <Status
        color={equipment.colorState}
        state={equipment.actualState}
      ></Status>

      <Separator style={{ opacity: 0.5 }} my="2" />
      <Center>
        <Link to={`/details/${equipment.equipmentId}`}>Ver detalhes</Link>
      </Center>
    </Stack>
  );
}

export default EquipmentPopup;
