import equipments from "../data/equipment.json";
import positionHistory from "../data/equipmentPositionHistory.json";
import stateHistory from "../data/equipmentStateHistory.json";
import states from "../data/equipmentState.json";
import models from "../data/equipmentModel.json";
import { useMemo, useState } from "react";
import {
  EquipamentStates,
  Equipment,
  EquipmentModel,
  Filter,
  LastPosition,
  State,
} from "../types";

export const useEquipments = () => {
  const [filter, setFilter] = useState<Filter>({});

  const all: Equipment[] = useMemo(() => {
    return equipments.map((equipment) => ({
      ...equipment,
      lastPosition: getLastPosition(equipment.id),
      lastState: getLastState(equipment.id),
      model: getModel(equipment.equipmentModelId),
    }));
  }, []);

  const filtered = useMemo(() => {
    return all.filter((equipment) => {
      if (!filter.state && !filter.name) {
        return true;
      }

      if (filter.state && equipment.lastState?.name === filter.state) {
        return true;
      }

      if (
        filter.name &&
        equipment.name
          .toLocaleLowerCase()
          .includes(filter.name.toLocaleLowerCase())
      ) {
        return true;
      }

      if (
        filter.name &&
        equipment.model?.name
          ?.toLocaleLowerCase()
          .includes(filter.name.toLocaleLowerCase())
      ) {
        return true;
      }

      return false;
    });
  }, [all, filter]);

  return {
    setFilter,
    equipments: filtered,
  };
};

const getLastPosition = (equipmentId: string) => {
  const positions: LastPosition[] =
    positionHistory.find((position) => position.equipmentId === equipmentId)
      ?.positions || [];

  return positions[positions.length - 1];
};

const getLastState = (equipmentId: string): State | undefined => {
  const equipamentStates: EquipamentStates[] =
    stateHistory.find((state) => state.equipmentId === equipmentId)?.states ||
    [];

  const lastState = equipamentStates[states.length - 1];

  const state: State | undefined = states.find(
    (state) => state.id === lastState.equipmentStateId
  );

  if (lastState && state) {
    return {
      ...lastState,
      ...state,
    };
  }
};

const getModel = (equipmentModelId: string) => {
  const model: EquipmentModel | undefined = models.find(
    (model) => model.id === equipmentModelId
  );
  return model;
};
