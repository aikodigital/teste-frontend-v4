import React, { useState, useEffect } from "react";
import EquipmentMap from "../../components/EquipamentMap/index";
import positionData from "../../data/equipmentPositionHistory.json";
import stateData from "../../data/equipmentStateHistory.json";
import stateTypes from "../../data/equipmentState.json";
import equipment from "../../data/equipment.json";
import equipmentModel from "../../data/equipmentModel.json";
import { Header } from "../../components/Header";
import ListHistoric from "../../components/ListHistoric/index";
import "./styles.scss";

interface Position {
  date: string;
  lat: number;
  lon: number;
  equipmentStateId?: string;
  equipmentId: string;
}

interface EquipmentPosition {
  equipmentId: string;
  positions: Position[];
}

interface EquipmentState {
  equipmentId: string;
  states: {
    date: string;
    equipmentStateId: string;
  }[];
}

interface StateType {
  id: string;
  name: string;
  color: string;
}

const Home: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);

  useEffect(() => {
    const processPositions = () => {
      const filteredPositions = (positionData as EquipmentPosition[]).flatMap(equipment => {
        const equipmentStates = (stateData as EquipmentState[]).find(state => state.equipmentId === equipment.equipmentId);

        if (!equipmentStates) return [];

        return equipment.positions.map(pos => {
          const state = equipmentStates.states.find(state => new Date(pos.date) >= new Date(state.date));
          return {
            ...pos,
            equipmentStateId: state?.equipmentStateId || "",
            equipmentId: equipment.equipmentId,
          };
        });
      });

      setPositions(filteredPositions);
    };
    processPositions();
  }, []);

  const handleEquipmentClick = (equipmentId: string) => {
    setSelectedEquipmentId(equipmentId);
  };

  return (
    <div>
      <Header />
      <div className="container">
      <div className="listHistoric">
          {selectedEquipmentId ? (
            <ListHistoric
              equipmentId={selectedEquipmentId}
              equipment={equipment}
            />
          ) : (
            <p className="p">Selecione um equipamento para ver o histórico.</p>
          )}
        </div>

        <div className="map">
          <EquipmentMap
            positions={positions}
            stateTypes={stateTypes}
            onEquipmentClick={handleEquipmentClick}
            equipment={equipment}
            equipmentModel={equipmentModel}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
