import { useEquipmentData } from "./useEquipmentData";
import { useEquipmentState } from "./useEquipmentState";
import { useEquipmentModel } from "./useEquipmentModel";
import { useEquipmentStateHistory } from "./useEquipmentStateHistory";
import { useEquipmentPositionHistory } from "./useEquipmentPositionHistory";

export const useEnrichedEquipmentData = () => {
    const { equipments } = useEquipmentData();
    const { states } = useEquipmentState();
    const { models } = useEquipmentModel();
    const { stateHistory } = useEquipmentStateHistory();
    const { positions } = useEquipmentPositionHistory();

    const enrichedData = equipments.map((equipment) => {
        const model = models.find((m) => m.id === equipment.equipmentModelId);

        const history = stateHistory.find((h) => h.equipmentId === equipment.id);
        const enrichedStateHistory = (history?.states ?? []).map((state) => {
            const stateInfo = states.find((s) => s.id === state.equipmentStateId);
            return {
                name: stateInfo?.name ?? "Desconhecido",
                color: stateInfo?.color ?? "#ccc",
                date: state.date,
            };
        });

        const latestState = history?.states?.[history.states.length - 1];
        const stateDetails = states.find((s) => s.id === latestState?.equipmentStateId);

        const positionData = positions.find((p) => p.equipmentId === equipment.id);
        const latestPosition = positionData?.positions?.[positionData.positions.length - 1];


        return {
            ...equipment,
            model: model ? model.name : "Desconhecido",
            state: stateDetails ? { name: stateDetails.name, color: stateDetails.color } : null,
            position: latestPosition ? { lat: latestPosition.lat, lon: latestPosition.lon } : null,
            stateHistory: enrichedStateHistory,
            positionHistory: positionData?.positions ?? [],
        };
    });

    return { data: enrichedData };
};
