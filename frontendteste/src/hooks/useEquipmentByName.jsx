import { useEffect, useState } from "react";

import equipmentData from "../data/equipment.json";
import equipmentModelsData from "../data/equipmentModel.json";
import equipmentPositionsData from "../data/equipmentPositionHistory.json";
import equipmentStatesData from "../data/equipmentState.json";
import equipmentStatesHistoryData from "../data/equipmentStateHistory.json";

const useEquipmentByName = (name) => {
  const [equipment, setEquipment] = useState(null);

  useEffect(() => {
    if (
      !name ||
      !equipmentData?.length ||
      !equipmentModelsData?.length ||
      !equipmentPositionsData?.length ||
      !equipmentStatesData?.length ||
      !equipmentStatesHistoryData?.length
    ) {
      console.warn("Dados ausentes ou nome não informado.");
      return;
    }

    const modelsMap = Object.fromEntries(equipmentModelsData.map((m) => [m.id, m]));
    const positionsMap = Object.fromEntries(equipmentPositionsData.map((p) => [p.equipmentId, p.positions]));
    const statesMap = Object.fromEntries(equipmentStatesData.map((s) => [s.id, s]));
    const statesHistoryMap = Object.fromEntries(equipmentStatesHistoryData.map((sh) => [sh.equipmentId, sh.states]));

    const foundEquip = equipmentData.find((equip) => equip.name.toLowerCase() === name.toLowerCase());

    if (!foundEquip) {
      console.warn("Equipamento não encontrado com nome:", name);
      return;
    }

    const model = modelsMap[foundEquip.equipmentModelId] || {};

    const positions = (positionsMap[foundEquip.id] || []).sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    const rawStateHistory = statesHistoryMap[foundEquip.id] || [];
    const stateHistory = rawStateHistory
      .map((stateRecord) => {
        const stateInfo = statesMap[stateRecord.equipmentStateId] || {};
        return {
          date: stateRecord.date,
          stateName: stateInfo.name || "Desconhecido",
          color: stateInfo.color || "#bdc3c7"
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    const latestState = stateHistory.length > 0
      ? stateHistory.reduce((latest, current) => (new Date(current.date) > new Date(latest.date) ? current : latest))
      : null;

    const currentState = latestState ? latestState.stateName : "Desconhecido";

    // Atualizando hourlyEarnings para trocar stateId por stateName
    const hourlyEarnings = (model.hourlyEarnings || []).map(({ equipmentStateId, ...rest }) => ({
      ...rest,
      stateName: statesMap[equipmentStateId]?.name || "Desconhecido",
    }));

    const enriched = {
      ...foundEquip,
      modelName: model.name || "Desconhecido",
      hourlyEarnings,
      positions,
      stateHistory,
      currentState,
    };

    setEquipment(enriched);
  }, [name]);

  return equipment;
};

export default useEquipmentByName;