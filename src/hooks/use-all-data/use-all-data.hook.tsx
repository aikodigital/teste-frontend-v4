import { useEffect, useState } from "react";
import {
  Equipment,
  EquipmentModel,
  EquipmentPositionHistory,
  EquipmentState,
  EquipmentStateHistory,
  ProcessedEquipment,
} from "@/types/equipment.type";
import { fetchData } from "@/utils/fetch-data";

export function useAllData() {
  const [allData, setAllData] = useState<ProcessedEquipment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          equipments,
          equipmentModels,
          equipmentStates,
          equipmentStateHistory,
          equipmentPositionHistory,
        ] = await Promise.all([
          fetchData<Equipment[]>("/data/equipment.json"),
          fetchData<EquipmentModel[]>("/data/equipment-model.json"),
          fetchData<EquipmentState[]>("/data/equipment-state.json"),
          fetchData<EquipmentStateHistory[]>(
            "/data/equipment-state-history.json",
          ),
          fetchData<EquipmentPositionHistory[]>(
            "/data/equipment-position-history.json",
          ),
        ]);

        const data = equipments.map((equipment: Equipment) => {
          // Encontrar o modelo do equipamento
          const model = equipmentModels.find(
            (model: EquipmentModel) => model.id === equipment.equipmentModelId,
          );

          // Encontrar o histórico de posições do equipamento
          const positionHistory = equipmentPositionHistory.find(
            (position: EquipmentPositionHistory) =>
              position.equipmentId === equipment.id,
          );

          // Determinar a posição mais recente
          const latestPosition = positionHistory?.positions?.reduce(
            (
              latest: { date: string; lat: number; lon: number },
              current: { date: string; lat: number; lon: number },
            ) =>
              new Date(current.date) > new Date(latest.date) ? current : latest,
            positionHistory?.positions[0],
          );

          // Encontrar o histórico de estados do equipamento
          const stateHistory = equipmentStateHistory.find(
            (state: EquipmentStateHistory) =>
              state.equipmentId === equipment.id,
          );

          // Determinar o estado mais recente
          const latestState = stateHistory?.states?.reduce(
            (
              latest: { date: string; equipmentStateId: string },
              current: { date: string; equipmentStateId: string },
            ) =>
              new Date(current.date) > new Date(latest.date) ? current : latest,
            stateHistory?.states[0],
          );

          // Detalhes do estado mais recente
          const stateDetails = equipmentStates.find(
            (state: EquipmentState) =>
              state.id === latestState?.equipmentStateId,
          );

          // Retornar os dados combinados
          return {
            id: equipment.id,
            name: equipment.name,
            model: model?.name,
            position: {
              lat: latestPosition?.lat || 0,
              lon: latestPosition?.lon || 0,
            },
            state: {
              id: stateDetails?.id,
              name: stateDetails?.name,
              color: stateDetails?.color,
            },
          };
        });

        setAllData(data);
      } catch (err) {
        setError("Failed to load equipment data. " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return { allData, loading, error };
}
