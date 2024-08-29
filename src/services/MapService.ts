//interfaces
import { EquipmentPosition, Position, Equipment, EquipmentStateHistory, EquipmentState, EquipmentData, EquipmentModel } from './interfaces/MapService.interface';

//data
import equipmentNames from '../data/equipment.json';
import equipmentPositionHistory from '../data/equipmentPositionHistory.json';
import equipmentState from '../data/equipmentState.json';
import equipmentStateHistory from '../data/equipmentStateHistory.json';
import equipmentModels from '../data/equipmentModel.json';

const combineEquipmentData = (): EquipmentData[] => {
  const equipmentMap = new Map<string, string>();
  const equipmentModelMap = new Map<string, EquipmentModel>();

  equipmentNames.forEach((equipment: Equipment) => {
    equipmentMap.set(equipment.id, equipment.name);
    if (equipment.equipmentModelId) {
      const model = equipmentModels.find((m: EquipmentModel) => m.id === equipment.equipmentModelId);
      if (model) {
        equipmentModelMap.set(equipment.id, model);
      }
    }
  });

  const combinedData: EquipmentData[] = equipmentPositionHistory.map((equipment: EquipmentPosition) => {
    const stateHistory = equipmentStateHistory.find(
      (state: EquipmentStateHistory) => state.equipmentId === equipment.equipmentId
    );

    const states = stateHistory ? stateHistory.states.map((stateRecord) => {
      const equipmentStateDetail = equipmentState.find(
        (s: EquipmentState) => s.id === stateRecord.equipmentStateId
      );
      return {
        date: stateRecord.date,
        stateName: equipmentStateDetail ? equipmentStateDetail.name : 'Desconhecido',
        color: equipmentStateDetail ? equipmentStateDetail.color : '#000000',
      };
    }) : [];

    const model = equipmentModelMap.get(equipment.equipmentId) || {
      id: 'unknown',
      name: 'Desconhecido',
      hourlyEarnings: []
    };

    return {
      equipmentId: equipment.equipmentId,
      name: equipmentMap.get(equipment.equipmentId) || 'Desconhecido',
      positions: equipment.positions,
      states: states,
      model: model
    };
  });

  return combinedData;
};

const getMostRecentPositions = (): EquipmentPosition[] => {
  const latestPositionsMap = new Map<string, Position>();

  equipmentPositionHistory.forEach((equipment: EquipmentPosition) => {
    const mostRecentPosition = equipment.positions.reduce((latest, current) => {
      if (!latest || new Date(current.date) > new Date(latest.date)) {
        return current;
      }
      return latest;
    }, null as Position | null);

    if (mostRecentPosition) {
      latestPositionsMap.set(equipment.equipmentId, mostRecentPosition);
    }
  });

  return Array.from(latestPositionsMap.entries()).map(([equipmentId, position]) => ({
    equipmentId,
    positions: [position],
  }));
};

const getMostRecentStates = (): Map<string, EquipmentState> => {
  const latestStatesMap = new Map<string, EquipmentState>();

  equipmentStateHistory.forEach((equipment: EquipmentStateHistory) => {
    const mostRecentState = equipment.states.reduce((latest, current) => {
      if (!latest || new Date(current.date) > new Date(latest.date)) {
        return current;
      }
      return latest;
    }, null as { date: string; equipmentStateId: string } | null);

    if (mostRecentState) {
      const state = equipmentState.find(state => state.id === mostRecentState.equipmentStateId);
      if (state) {
        latestStatesMap.set(equipment.equipmentId, state);
      }
    }
  });

  return latestStatesMap;
};

const convertToMarkers = (
  positions: EquipmentPosition[],
  equipmentList: Equipment[],
  equipmentStates: Map<string, EquipmentState>,
  equipmentModels: EquipmentModel[]
): { id: string, lat: number; lng: number; title: string; state: string; color: string; model: string }[] => {
  const equipmentMap = new Map<string, { name: string, modelId: string | null }>();
  const equipmentModelMap = new Map<string, string>();

  equipmentList.forEach(equipment => {
    equipmentMap.set(equipment.id, { name: equipment.name, modelId: equipment.equipmentModelId });
  });

  equipmentModels.forEach(model => {
    equipmentModelMap.set(model.id, model.id);
  });

  return positions.map(equipment => {
    const mostRecentPosition = equipment.positions[0];
    const state = equipmentStates.get(equipment.equipmentId);

    const equipmentData = equipmentMap.get(equipment.equipmentId);
    const equipmentModelId= equipmentData && equipmentData.modelId ? equipmentModelMap.get(equipmentData.modelId) : 'Modelo Desconhecido';

    return {
      id: equipment.equipmentId,
      lat: mostRecentPosition.lat,
      lng: mostRecentPosition.lon,
      title: equipmentData ? equipmentData.name : 'Desconhecido',
      state: state ? state.name : 'Desconhecido',
      color: state ? state.color : '#000000',
      model: equipmentModelId || 'Modelo Desconhecido' 
    };
  });
};


const getMarkers = (): { id: string, lat: number; lng: number; title: string; state: string; color: string; model: string }[] => {
  const positions = getMostRecentPositions();
  const states = getMostRecentStates();
  return convertToMarkers(positions, equipmentNames, states, equipmentModels);
};


export { getMarkers, combineEquipmentData };
