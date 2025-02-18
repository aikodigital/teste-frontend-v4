import { useEffect, useState } from "react";
import { 
  modeloContext,
  position,
  modeloEquipament,
  horasTrabalhadas,
  estadoEquipamento,
  historicoEquipamento
 } from "./ModeloContext";

import PropsModelProvider from "../types/typeModelProvider";
import equipment from "../../data/equipment.json";
import equipmentPosition from "../../data/equipmentPositionHistory.json";
import equipmentState from "../../data/equipmentState.json";
import equipmentModel from "../../data/equipmentModel.json";
import equipmentStateHistory from "../../data/equipmentStateHistory.json";

import { typeModeloContext } from "../types/typeModelContext";
import { EquipmentIdModelos, typeEquipments, typeIdModelos } from "../types/typeEquipments";
import { typeWorkedHours, typeStateEquipment, typeEquipamentHistory } from "./ModeloContext";

export default function ModeloProvider({ children }: PropsModelProvider) {
    const [modelo, setModelo] = useState<typeModeloContext["modelo"]>([]);
    const [positions, setPositions] = useState<typeEquipments["positions"]>([]);
    const [equipamentoId, setEquipamentoId] = useState<EquipmentIdModelos>({
      modelEquipment: "CA-0001",
      datePosition: "2021-02-01T15:00:00.000Z"
    });
    const [worked, setWorked] = useState<typeWorkedHours["worked"]>([]);
    const [stateEquipment, setStateEquipment] = useState<typeStateEquipment["stateEquipment"]>([]);
    const [equipmentHistory, setEquipmentHistory] = useState<typeEquipamentHistory["equipmentHistory"]>([]);

    const value: typeModeloContext = {
      modelo,
      setModelo,
    }

    const localizationModel: typeEquipments = {
      positions,
      setPositions,
    }

    const modelos: typeIdModelos = {
      equipamentoId,
      setEquipamentoId,
    };

    const horaTrabalhada: typeWorkedHours = {
      worked,
      setWorked,
    }

    const stateEquip: typeStateEquipment = {
      stateEquipment,
      setStateEquipment,
    }

    const valueHistory: typeEquipamentHistory = {
      equipmentHistory,
      setEquipmentHistory,
    }

    useEffect(() => {
        setModelo(equipment);
        setPositions(equipmentPosition);
        setStateEquipment(equipmentState);
        setWorked(equipmentModel);
        setEquipmentHistory(equipmentStateHistory);
    }, [])

  return (
    <modeloContext.Provider value={value}>
      <position.Provider value={localizationModel}>
        <modeloEquipament.Provider value={modelos}>
          <horasTrabalhadas.Provider value={horaTrabalhada}>
            <estadoEquipamento.Provider value={stateEquip}>
              <historicoEquipamento.Provider value={valueHistory}>
                {children}
              </historicoEquipamento.Provider>
            </estadoEquipamento.Provider>
          </horasTrabalhadas.Provider>
        </modeloEquipament.Provider>
      </position.Provider>
    </modeloContext.Provider>
  );
}