import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { AreaChartData } from '~/components/recharts/area.rechart';
import { PieChartData } from '~/components/recharts/pie.rechart';
import { ReduxState } from '~/redux/store';
import { palette } from '~/styles/colors';
import { EquipmentModel } from '~/types/equipment-model.types';
import { Position } from '~/types/equipment-position-history.types';
import { State as StateHistory } from '~/types/equipment-state-history.types';
import { StateType } from '~/types/equipment-state.types';
import { Equipment } from './use-equipments.hook';

export interface EquipmentDetails {
  id: string;
  name: string;
  model?: EquipmentModel;
  states: StateHistory[];
  positions: Position[];
  productivity: ProductivityInfo;
}

export interface ProductivityInfo {
  operatingTime: number;
  maintenanceTime: number;
  stoppedTime: number;
}

export interface ChartData {
  pieChartData: PieChartData[];
  areaChartData: AreaChartData[];
}

export interface EquipmentDetailsHook {
  tab: number;
  details?: EquipmentDetails;
  historyVisible: boolean;
  markers: Equipment[];
  chartData: ChartData;
  selectedDate: string;
  handleOpen: (id: string) => void;
  handleClose: () => void;
  handleTabChange: (tab: number) => void;
  handleDateChange: (date: string) => void;
  toggleHistoryVisibility: () => void;
  findStateNameById: (stateId: string) => string;
}

const INITIAL_PRODUCTIVITY_STATE: ProductivityInfo = {
  operatingTime: 0,
  maintenanceTime: 0,
  stoppedTime: 0,
};

export const useEquipmentDetails = (): EquipmentDetailsHook => {
  const [id, setId] = useState<string>('');
  const [tab, setTab] = useState<number>(0);
  const [historyVisible, setHistoryVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [markers, setMarkers] = useState<Equipment[]>([]);

  const {
    equipments: { data: equipments },
    state: { data: states },
    stateHistory: { data: stateHistory },
    position: { data: positionHistory },
    model: { data: models },
  } = useSelector((state: ReduxState) => state);

  const equipmentDetails = useMemo(() => {
    if (!id) return undefined;

    const equipmentMap = new Map(equipments.map((e) => [e.id, e]));
    const modelMap = new Map(models.map((m) => [m.id, m]));
    const stateMap = new Map(states.map((s) => [s.id, s]));

    const equipment = equipmentMap.get(id);
    if (!equipment) return undefined;

    const model = modelMap.get(equipment.equipmentModelId);
    if (!model) return undefined;

    const findById = <T extends { equipmentId: string }>(
      array: T[] | undefined,
      targetId: string
    ): T | undefined => array?.find((item) => item.equipmentId === targetId);

    const equipmentStateHistory = findById(stateHistory, id);
    const equipmentStates = (equipmentStateHistory?.states || []).map(
      (item) => {
        const fullState = stateMap.get(item.equipmentStateId);
        return fullState ? { ...item, ...fullState } : item;
      }
    );

    const positions = findById(positionHistory, id)?.positions || [];

    const calculateProductivity = (): ProductivityInfo => {
      const metrics: ProductivityInfo = { ...INITIAL_PRODUCTIVITY_STATE };

      if (equipmentStates.length === 0) {
        return metrics;
      }

      const getDurationHours = (start: string, end: string): number =>
        (new Date(end).getTime() - new Date(start).getTime()) /
        (1000 * 60 * 60);

      const sortedStates = [...equipmentStates]
        .filter((s) => (selectedDate ? s.date.startsWith(selectedDate) : true))
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

      if (sortedStates.length === 0) {
        return metrics;
      }

      sortedStates.forEach((current, index) => {
        const next = sortedStates[index + 1];
        const endDate =
          next?.date || sortedStates[sortedStates.length - 1].date;
        const duration = getDurationHours(current.date, endDate);

        const state = stateMap.get(current.equipmentStateId);
        const stateName = state?.name.toLowerCase();

        if (stateName === StateType.OPERATING) {
          metrics.operatingTime += duration;
        } else if (stateName === StateType.MAINTENANCE) {
          metrics.maintenanceTime += duration;
        } else {
          metrics.stoppedTime += duration;
        }
      });

      return {
        operatingTime: Number(metrics.operatingTime.toFixed(2)),
        maintenanceTime: Number(metrics.maintenanceTime.toFixed(2)),
        stoppedTime: Number(metrics.stoppedTime.toFixed(2)),
      };
    };

    return {
      id: equipment.id,
      name: equipment.name,
      model,
      states: equipmentStates,
      positions,
      productivity: calculateProductivity(),
    };
  }, [
    id,
    equipments,
    states,
    stateHistory,
    positionHistory,
    models,
    selectedDate,
  ]);

  const getStateDuration = (start: string, end: string): number => {
    return (
      (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60)
    );
  };

  const chartData = useMemo((): ChartData => {
    if (!equipmentDetails) {
      return {
        pieChartData: [],
        areaChartData: [],
      };
    }

    const { operatingTime, maintenanceTime, stoppedTime } =
      equipmentDetails.productivity;
    const total = operatingTime + maintenanceTime + stoppedTime;

    const pieChartData = [
      {
        name: 'Operando',
        value: operatingTime,
        percentage: ((operatingTime / total) * 100).toFixed(2),
      },
      {
        name: 'Manutenção',
        value: maintenanceTime,
        percentage: ((maintenanceTime / total) * 100).toFixed(2),
      },
      {
        name: 'Parado',
        value: stoppedTime,
        percentage: ((stoppedTime / total) * 100).toFixed(2),
      },
    ];

    const areaChartData: AreaChartData[] = [];
    let accumulated = 0;
    const equipmentStates = equipmentDetails?.states || [];

    const sortedStates = [...equipmentStates]
      .filter((s) => (selectedDate ? s.date.startsWith(selectedDate) : true))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    sortedStates.forEach((current, index) => {
      const next = sortedStates[index + 1];
      const endDate = next?.date || sortedStates[sortedStates.length - 1].date;
      const duration = getStateDuration(current.date, endDate);

      const hourlyEarning =
        equipmentDetails?.model?.hourlyEarnings.find(
          (item) => item.equipmentStateId === current.equipmentStateId
        )?.value || 0;

      const generated = duration * hourlyEarning;
      accumulated += generated;

      areaChartData.push({
        date: new Date(current.date).toLocaleString('pt-BR'),
        valueGenerated: Number(accumulated.toFixed(2)),
      });
    });

    return {
      pieChartData,
      areaChartData,
    };
  }, [equipmentDetails, selectedDate]);

  const findStateNameById = (stateId: string): string => {
    return states?.find((state) => state.id === stateId)?.name || '';
  };

  const getHistoryMapMarkers = (details: EquipmentDetails): Equipment[] => {
    return details.positions.map((position) => ({
      id: details.id,
      name: details.name,
      model: details.model?.name ?? '',
      position,
      state: {
        id: '',
        name: '',
        color: palette.primary,
      },
    }));
  };

  const toggleHistoryVisibility = (): void => {
    if (!historyVisible && equipmentDetails) {
      const newMarkers = getHistoryMapMarkers(equipmentDetails);
      setMarkers(newMarkers);
    } else {
      setMarkers([]);
    }

    setHistoryVisible((prev) => !prev);
  };

  const handleTabChange = (newTab: number): void => setTab(newTab);

  const handleClose = (): void => setId('');

  return {
    tab,
    details: equipmentDetails,
    historyVisible,
    markers,
    chartData,
    selectedDate,
    handleOpen: setId,
    handleClose,
    handleTabChange,
    handleDateChange: setSelectedDate,
    toggleHistoryVisibility,
    findStateNameById,
  };
};
