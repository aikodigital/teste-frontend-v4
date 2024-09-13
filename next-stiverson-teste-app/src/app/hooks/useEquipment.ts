import { useState, useEffect } from 'react';

export function useEquipment() {
  const [equipmentData, setEquipmentData] = useState<[] | undefined>(undefined);
  const [positionData, setPositionData] = useState<[] | undefined>(undefined);
  const [equipmentState, setEquipmentState] = useState<[] | undefined>(undefined);
  const [equipmentStateHistory, setEquipmentStateHistory] = useState<[] | undefined>(undefined);
  const [isLoadingEquipments, setIsLoadingEquipments] = useState(true);
  const [isLoadingPositions, setIsLoadingPositions] = useState(true);
  const [isLoadingStates, setIsLoadingStates] = useState(true);
  const [isLoadingStateHistory, setIsLoadingStateHistory] = useState(true);

  useEffect(() => {
    fetch('/data/equipment.json')
      .then((res) => res.json())
      .then((data) => {
        setEquipmentData(data);
        setIsLoadingEquipments(false);
      });

    fetch('/data/equipmentPositionHistory.json')
      .then((res) => res.json())
      .then((data) => {
        setPositionData(data);
        setIsLoadingPositions(false);
      });

    fetch('/data/equipmentState.json')
      .then((res) => res.json())
      .then((data) => {
        setEquipmentState(data);
        setIsLoadingStates(false);
      });

    fetch('/data/equipmentStateHistory.json')
      .then((res) => res.json())
      .then((data) => {
        setEquipmentStateHistory(data);
        setIsLoadingStateHistory(false);
      });
  }, []);

  return {
    equipmentData,
    positionData,
    equipmentState,
    equipmentStateHistory,
    isLoadingEquipments,
    isLoadingPositions,
    isLoadingStates,
    isLoadingStateHistory,
  };
}
