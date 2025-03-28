/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEquipmentState } from './useEquipmentState';
import cargaFuncionando from '../assets/cargaFuncionando.png';
import cargaParado from '../assets/cargaParado.png';
import cargaManutencao from '../assets/cargaManutencao.png';
import HarvesterFuncionando from '../assets/harvesterFuncionando.png';
import HarvesterParado from '../assets/harvesterParado.png';
import HarvesterManutencao from '../assets/harvesterManutencao.png';
import GarraFuncionando from '../assets/garraFuncionando.png';
import GarraParada from '../assets/garraParada.png';
import GarraManutencao from '../assets/garraManutencao.png';


interface EquipmentStateHistory {
  date: string;
  equipmentStateId: string;
}

interface Productivity {
  productivity: number;
  hoursWorked: number;
}

interface EquipmentState {
  id: string;
  name: string;
  color: string;
}
interface HourlyEarnings {
  equipmentStateId: string;
  value: number;
}

interface Equipment {
  id: string;
  name: string;
  equipmentModelId: string;
  lastState: EquipmentState;
  stateHistory: EquipmentStateHistory[];
  modelHourlyEarnings?: HourlyEarnings[];
}

interface GainResult {
  totalGain: number;
}

const getMarkerIcon = (equipment: Equipment): google.maps.Icon => {
  let iconUrl = '';

  if (equipment.equipmentModelId === "a3540227-2f0e-4362-9517-92f41dabbfdf") {
    if (equipment.lastState.name === 'Operando') {
      iconUrl = cargaFuncionando;
    } else if (equipment.lastState.name === 'Parado') {
      iconUrl = cargaParado;
    } else if (equipment.lastState.name === 'Manutenção') {
      iconUrl = cargaManutencao;
    }
  }

  if (equipment.equipmentModelId === "a4b0c114-acd8-4151-9449-7d12ab9bf40f") {
    if (equipment.lastState.name === 'Operando') {
      iconUrl = HarvesterFuncionando;
    } else if (equipment.lastState.name === 'Parado') {
      iconUrl = HarvesterParado;
    } else if (equipment.lastState.name === 'Manutenção') {
      iconUrl = HarvesterManutencao;
    }
  }

  if (equipment.equipmentModelId === "9c3d009e-0d42-4a6e-9036-193e9bca3199") {
    if (equipment.lastState.name === 'Operando') {
      iconUrl = GarraFuncionando;
    } else if (equipment.lastState.name === 'Parado') {
      iconUrl = GarraParada;
    } else if (equipment.lastState.name === 'Manutenção') {
      iconUrl = GarraManutencao;
    }
  }

  return {
    url: iconUrl,
    scaledSize: new window.google.maps.Size(40, 40),
  };
};

export const fetchData = async () => {
  const equipmentData = await fetch('/data/equipment.json').then((res) => res.json());
  const modelData = await fetch('/data/equipmentModel.json').then((res) => res.json());
  const stateData = await fetch('/data/equipmentState.json').then((res) => res.json());
  const stateHistoryData = await fetch('/data/equipmentStateHistory.json').then((res) => res.json());
  const positionData = await fetch('/data/equipmentPositionHistory.json').then((res) => res.json());

  const updatedEquipments = equipmentData.map((equipment: any) => {
    const model = modelData.find((model: any) => model.id === equipment.equipmentModelId);
    const stateHistory = stateHistoryData.find((state: any) => state.equipmentId === equipment.id);

    const lastState = stateHistory?.states.reduce((latest: any, state: any) => {
      return new Date(state.date) > new Date(latest.date) ? state : latest;
    }, stateHistory?.states[0]);

    const stateInfo = stateData.find((state: any) => state.id === lastState?.equipmentStateId);
    const position = positionData.find((pos: any) => pos.equipmentId === equipment.id)?.positions.pop();

    return {
      ...equipment,
      model: model?.name || 'Desconhecido',
      lastState: stateInfo || { name: 'Desconhecido', color: 'black' },
      lastPosition: position || { lat: 0, lon: 0 },
      stateHistory: stateHistory?.states || [],
      modelHourlyEarnings: model?.hourlyEarnings || [],
      positionHistory: positionData.filter((pos: any) => pos.equipmentId === equipment.id),
    };
  });

  const allDates = new Set<string>();
  updatedEquipments.forEach((equipment: any) => {
    equipment.positionHistory.forEach((position: any) => {
      const positionDate1 = position.positions;
      positionDate1.forEach((element: any) => {
        const formattedDate = new Date(element.date).toLocaleDateString();
        allDates.add(formattedDate);
      });
    });
  });

  return {
    updatedEquipments,
    modelData,
    stateData,
    allDates: Array.from(allDates),
    
  };
};


const useFilteredEquipmentsHook = () => {
  const { equipments, selectedEquipmentFilter, selectedStateFilter, selectedDate } = useEquipmentState();
  let filtered = equipments;

  if (selectedEquipmentFilter) {
    filtered = filtered.filter((equipment: Equipment) => equipment.name.includes(selectedEquipmentFilter));
  }

  if (selectedStateFilter) {
    filtered = filtered.filter((equipment: Equipment) => equipment.lastState.name === selectedStateFilter);
  }

  if (selectedDate) {
    filtered = filtered.filter((equipment: Equipment) => {
      const stateHistory = equipment.stateHistory.filter((state: EquipmentStateHistory) => {
        const stateDate = new Date(state.date).toLocaleDateString();
        return stateDate === selectedDate || !selectedDate;
      });
      return stateHistory.length > 0;
    });
  }

  return filtered;
};

const calculateProductivity = (equipment: Equipment, selectedDate?: string): Productivity => {
  const stateHistory = equipment.stateHistory.filter((state: EquipmentStateHistory) => {
    const stateDate = new Date(state.date).toLocaleDateString();
    return stateDate === selectedDate || !selectedDate;
  });

  if (stateHistory.length === 0 || stateHistory[stateHistory.length - 1].equipmentStateId !== "0808344c-454b-4c36-89e8-d7687e692d57") {
    return { productivity: 0, hoursWorked: 0 };
  }

  const lastStateTime = new Date(stateHistory[stateHistory.length - 1].date).getTime();
  const endOfDay = new Date(lastStateTime);
  endOfDay.setHours(24, 0, 0, 0);

  const timeDifference = (endOfDay.getTime() - lastStateTime) / (1000 * 60 * 60);
  const totalHours = 24;
  const productivity = (timeDifference / totalHours) * 100;

  return { productivity, hoursWorked: timeDifference };
};

const calculateGain = (equipment: Equipment, selectedDate: string | null): GainResult => {
  let totalGain = 0;

  const stateHistory = equipment.stateHistory.filter((state: EquipmentStateHistory) => {
    const stateDate = new Date(state.date).toLocaleDateString();
    return stateDate === selectedDate || !selectedDate;
  });

  stateHistory.forEach((state: EquipmentStateHistory) => {
    const hourlyEarning = equipment.modelHourlyEarnings?.find(
      (earning) => earning.equipmentStateId === state.equipmentStateId
    );

    if (hourlyEarning && hourlyEarning.value !== undefined) {
      totalGain += hourlyEarning.value;
    }
  });

  return { totalGain };
};

const filteredEquipments = (
  equipments: Equipment[],
  selectedEquipmentFilter: string,
  selectedStateFilter: string,
  selectedDate?: string | null
): Equipment[] => {
  let filtered = equipments;

  if (selectedEquipmentFilter) {
    filtered = filtered.filter((equipment: Equipment) => equipment.name.includes(selectedEquipmentFilter));
  }

  if (selectedStateFilter) {
    filtered = filtered.filter((equipment: Equipment) => equipment.lastState.name === selectedStateFilter);
  }

  if (selectedDate) {
    filtered = filtered.filter((equipment: Equipment) => {
      const stateHistory = equipment.stateHistory.filter((state: EquipmentStateHistory) => {
        const stateDate = new Date(state.date).toLocaleDateString();
        return stateDate === selectedDate || !selectedDate;
      });
      return stateHistory.length > 0;
    });
  }

  return filtered;
};


export { getMarkerIcon, useFilteredEquipmentsHook, calculateProductivity, calculateGain, filteredEquipments };
