import { useEffect, useState } from "react";
import { equipment, equipmentState, equipmentStateHistory } from "../data";

interface EquipmentDetailsProps {
  equipmentId: string
}

export default function EquipmentDetails({ equipmentId }: EquipmentDetailsProps) {
  const history = equipmentStateHistory.find(e => e.equipmentId === equipmentId);
  const [productivity, setProductivity] = useState<number | null>(null);

  useEffect(() => {
    (() => {
      const equipmentStates = equipmentStateHistory.find(e => e.equipmentId === equipmentId)?.states;
  
      if (!equipmentStates) return;
  
      const operatingState = equipmentState.find(state => state.name === "Operando");
      if (!operatingState) return;
  
      let totalHours = 0;
      let operatingHours = 0;
  
      for (let i = 0; i < equipmentStates.length; i++) {
        const currentState = equipmentStates[i];
        const nextState = equipmentStates[i + 1];
        const duration = nextState ? new Date(nextState.date).getTime() - new Date(currentState.date).getTime() : 0;
  
        const hours = duration / (1000 * 60 * 60);
        totalHours += hours;
  
        if (currentState.equipmentStateId === operatingState.id) {
          operatingHours += hours;
        }
      }
  
      const productivityPercent = totalHours ? (operatingHours / totalHours) * 100 : 0;
      setProductivity(productivityPercent);
    })();
  }, [equipmentId]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar">
      <h1 className="text-xl font-semibold sticky top-0 pb-4 bg-gray-800">Histórico de Estados: {equipment.find(e => e.id === equipmentId)?.name}</h1>
      { productivity !== null && <p>Produtividade: {productivity.toFixed(2)}%</p> }
      <ul className="space-y-2">
        {history?.states.map((state, index) => {
          const stateInfo = equipmentState.find(s => s.id === state.equipmentStateId);

          return (
            <li key={index} className="flex justify-between items-center p-2 bg-gray-700 rounded-md">
              <div>
                <span>{new Date(state.date).toLocaleDateString()} - </span>
                <span className="font-semibold" style={{ color: stateInfo?.color }}>{stateInfo?.name}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
}