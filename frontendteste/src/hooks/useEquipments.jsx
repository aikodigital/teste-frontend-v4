import { useEffect, useState } from "react";

import equipmentData from "../data/equipment.json";
import equipmentModelsData from "../data/equipmentModel.json";
import equipmentPositionsData from "../data/equipmentPositionHistory.json";
import equipmentStatesData from "../data/equipmentState.json";
import equipmentStatesHistoryData from "../data/equipmentStateHistory.json";

const useEquipments = () => {
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    if (
      !equipmentData?.length ||
      !equipmentModelsData?.length ||
      !equipmentPositionsData?.length ||
      !equipmentStatesData?.length ||
      !equipmentStatesHistoryData?.length
    ) {
      console.warn("Dados ausentes. Verifique os arquivos JSON.");
      return;
    }

    // 🔹 Criar mapas para acesso rápido por ID
    const modelsMap = Object.fromEntries(
      equipmentModelsData.map((m) => [m.id, m])
    );
    const positionsMap = Object.fromEntries(
      equipmentPositionsData.map((p) => [p.equipmentId, p.positions])
    );
    const statesMap = Object.fromEntries(
      equipmentStatesData.map((s) => [s.id, s])
    );
    const statesHistoryMap = Object.fromEntries(
      equipmentStatesHistoryData.map((sh) => [sh.equipmentId, sh.states])
    );

    // 🔹 Criar equipamentos enriquecidos
    const enrichedEquipments = equipmentData.map((equip) => {
      const model = modelsMap[equip.equipmentModelId] || {};

      // Ordenar posições da mais recente para a mais antiga
      const positions = (positionsMap[equip.id] || []).sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      // Ordenar e transformar histórico de estados, incluindo cor
      const rawStateHistory = statesHistoryMap[equip.id] || [];
      const stateHistory = rawStateHistory
        .map((stateRecord) => {
          const stateInfo = statesMap[stateRecord.equipmentStateId] || {};
          return {
            date: stateRecord.date,
            stateName: stateInfo.name || "Desconhecido",
            color: stateInfo.color || "#bdc3c7",
          };
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      // 🔹 Identificar o estado mais recente do equipamento
      const latestState = stateHistory.length > 0 ? stateHistory[0] : null;

      return {
        ...equip,
        modelName: model.name || "Desconhecido",
        hourlyEarnings: (model.hourlyEarnings || []).map((earning) => ({
          stateName:
            statesMap[earning.equipmentStateId]?.name || "Desconhecido",
          value: earning.value,
        })),
        positions,
        stateHistory,
        currentState: latestState?.stateName || "Desconhecido",
        currentStateColor: latestState?.color || "#bdc3c7",
      };
    });

    setEquipments(enrichedEquipments);
  }, []);

  return equipments;
};

export default useEquipments;
