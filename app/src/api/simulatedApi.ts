import equipments from "../../data/equipment.json";
import equipmentsModelsJson from "../../data/equipmentModel.json";
import equipmentsPositions from "../../data/equipmentPositionHistory.json";

export const fetchEquipments = () => {
  return equipments;
};

export const fetchEquipmentModelById = (id: string) => {
  const filteredEquipement = equipmentsModelsJson.filter(
    (equipment) => id === equipment.id
  );

  return filteredEquipement;
};

export const fetchOrderedPositions = (id: string) => {
  const filteredEquipment = equipmentsPositions.filter(
    (equipment) => id === equipment.equipmentId
  );
  const positions = filteredEquipment[0].positions;

  positions.sort((a, b) => {
    return a.date.localeCompare(b.date);
  });

  return positions;
};
