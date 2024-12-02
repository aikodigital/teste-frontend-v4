import { useEffect, useState } from "react";
import { modeloContext, equipmentId } from "./ModeloContext";

import PropsModelProvider from "../types/typeModelProvider";
import equipment from "../../data/equipment.json";
import equipmentPosition from "../../data/equipmentPositionHistory.json";
import { typeModeloContext } from "../types/typeModelContext";
import typeEquipments from "../types/typeEquipments";

export default function ModeloProvider({ children }: PropsModelProvider) {
    const [modelo, setModelo] = useState<typeModeloContext["modelo"]>([]);
    const [equipamento, setEquipamento] = useState<typeEquipments>([]);
    const [equipamentoId, setEquipamentoId] = useState('');

    const value: typeModeloContext = {
        modelo,
        setModelo,
    }
    
    useEffect(() => {
        setModelo(equipment);
        setEquipamento(equipmentPosition);
    }, [])

  return (
    <modeloContext.Provider value={value}>
      <equipmentId.Provider value={equipamento}>
        {children}
      </equipmentId.Provider>
    </modeloContext.Provider>
  );
}