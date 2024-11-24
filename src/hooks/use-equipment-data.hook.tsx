import { useEffect, useState } from "react";
import {
  fetchEquipment,
  fetchEquipmentModel,
  fetchEquipmentPositionHistory,
  fetchEquipmentState,
  fetchEquipmentStateHistory,
} from "./use-equipment.hook";

export function useEquipmentData() {
  const [processedData, setProcessedData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          equipments,
          equipmentModels,
          equipmentStates,
          equipmentStateHistory,
          equipmentPositionHistory,
        ] = await Promise.all([
          fetchEquipment(),
          fetchEquipmentModel(),
          fetchEquipmentState(),
          fetchEquipmentStateHistory(),
          fetchEquipmentPositionHistory(),
        ]);

        const combinedData = equipments.map((equipment: any) => {
          // Equipment model
          const model = equipmentModels.find(
            (model: any) => model.id === equipment.equipmentModelId
          );

          // Last position
          const positionHistory = equipmentPositionHistory.find(
            (position: any) => position.equipmentId === equipment.id
          );
          const latestPosition = positionHistory?.positions?.reduce(
            (latest: any, current: any) =>
              new Date(current.date) > new Date(latest.date) ? current : latest,
            positionHistory?.positions[0]
          );

          // Last state
          const stateHistory = equipmentStateHistory.find(
            (state: any) => state.equipmentId === equipment.id
          );
          const latestState = stateHistory?.states?.reduce(
            (latest: any, current: any) =>
              new Date(current.date) > new Date(latest.date) ? current : latest,
            stateHistory?.states[0]
          );

          // state most recently status
          const stateDetails = equipmentStates.find(
            (state: any) => state.id === latestState?.equipmentStateId
          );

          return {
            id: equipment.id,
            name: equipment.name,
            model: model?.name,
            position: latestPosition,
            state: {
              id: stateDetails?.id,
              name: stateDetails?.name,
              color: stateDetails?.color,
            },
          };
        });

        setProcessedData(combinedData);
      } catch (err) {
        setError("Error when loading the data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data: processedData,
    loading,
    error,
  };
}
