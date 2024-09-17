import { useEffect, useState } from "react";

import equipmentData from "@/data/equipment.json";
import equipmentModelData from "@/data/equipmentModel.json";
import equipmentPositionHistoryData from "@/data/equipmentPositionHistory.json";
import equipmentStateData from "@/data/equipmentState.json";
import equipmentStateHistoryData from "@/data/equipmentStateHistory.json";

export interface Equipment {
   id: string;
   equipmentModelId: string;
   name: string;
}

export interface EquipmentPosition {
   equipmentId: string;
   positions: {
      date: string;
      lat: number;
      lon: number;
   }[];
}

export interface EquipmentState {
   equipmentId: string;
   states: {
      date: string;
      equipmentStateId: string;
   }[];
}

interface States {
   id: string;
   name: string;
   color: string;
}

interface EquipmentModel {
   id: string;
   name: string;
   hourlyEarnings: {
      equipmentStateId: string;
      value: number;
   }[];
}


export interface EquipmentWithStatus extends Equipment {
   status: string;
   color: string;
   modelName: string;
   position: {
      date: string;
      lat: number;
      lon: number;
   } | null;
   stateHistory: {
      date: string;
      equipmentStateId: string;
      name: string;
   }[];
}

const useEquipmentData = () => {
   const [equipments, setEquipments] = useState<Equipment[]>([]);
   const [positions, setPositions] = useState<EquipmentPosition[]>([]);
   const [stateHistory, setStateHistory] = useState<EquipmentState[]>([]);
   const [states, setStates] = useState<States[]>([]);
   const [models, setModels] = useState<EquipmentModel[]>([]);

   const getEquipmentStatus = (equipamentoId: string) => {
      const history = stateHistory.find(
        (item) => item.equipmentId === equipamentoId
      );

      if (!history || !history.states.length) return null;

      // Ordenar por data para pegar o estado mais recente
      const lastState = history.states.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];

      // Buscar o status correspondente
      return states.find(
        (status) => status.id === lastState.equipmentStateId
      );
    };

    const getModelName = (modelId: string) => {
      const model = models.find((item) => item.id === modelId);
      return model ? model.name : "Modelo desconhecido";
    }

    const getEquipmentPositionAndDate = (equipamentoId: string) => {
      const history = positions.find(
        (item) => item.equipmentId === equipamentoId
      );

      if (!history || !history.positions.length) return null;

      // Ordenar por data para pegar a posição mais recente
      const lastPosition = history.positions.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];

      return lastPosition;
    }

    const getStateHistoryAndAddName = (equipamentoId: string) => {
      const history = stateHistory.find(
        (item) => item.equipmentId === equipamentoId
      );

      if (!history || !history.states.length) return [];

      // Ordenar por data para pegar o estado mais recente
      const statesWithNames = history.states.map((state) => {
        const actualState = states.find(
          (status) => status.id === state.equipmentStateId
        );
        return {
          ...state,
          name: actualState ? actualState.name : "Status desconhecido",
        };
      });

      return statesWithNames;
    }

    const mappedEquipmentsWithAllInfos = () => {
      return equipments.map((equipamento) => {
        const actualState = getEquipmentStatus(equipamento.id);
        const modelName = getModelName(equipamento.equipmentModelId);
        const position = getEquipmentPositionAndDate(equipamento.id);
        return {
          ...equipamento,
          status: actualState ? actualState.name : "Status desconhecido",
          color: actualState ? actualState.color : "#000000",
          modelName,
          position,
          positions: positions.find((item) => item.equipmentId === equipamento.id)?.positions || [],
          stateHistory: getStateHistoryAndAddName(equipamento.id),
        };
      });
    };

    const equipmentsMapped = mappedEquipmentsWithAllInfos();

   useEffect(() => {
      // Simulando carregamento de dados
      setEquipments(equipmentData);
      setPositions(equipmentPositionHistoryData);
      setStateHistory(equipmentStateHistoryData);
      setStates(equipmentStateData);
      setModels(equipmentModelData);
   }, []);

   return { equipments, positions, stateHistory, states, models, equipmentsMapped };
};

export default useEquipmentData;
