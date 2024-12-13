import { useEffect, useState } from "react";
import { 
  modeloContext,
  position,
  modeloEquipament,
 } from "./ModeloContext";

import PropsModelProvider from "../types/typeModelProvider";
import equipment from "../../data/equipment.json";
import equipmentPosition from "../../data/equipmentPositionHistory.json";
import { typeModeloContext } from "../types/typeModelContext";
import { typeEquipments, typeIdModelos } from "../types/typeEquipments";

export default function ModeloProvider({ children }: PropsModelProvider) {
    const [modelo, setModelo] = useState<typeModeloContext["modelo"]>([]);
    const [positions, setPositions] = useState<typeEquipments["positions"]>([]);
    const [equipamentoId, setEquipamentoId] = useState<typeIdModelos["equipamentoId"]>("CA-0001");

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
    }
    
    useEffect(() => {
        setModelo(equipment);
        setPositions(equipmentPosition);
    }, [])

  return (
    <modeloContext.Provider value={value}>
      <position.Provider value={localizationModel}>
        <modeloEquipament.Provider value={modelos}>
        {children}
        </modeloEquipament.Provider>
      </position.Provider>
    </modeloContext.Provider>
  );
}