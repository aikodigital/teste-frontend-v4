import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { EquipmentState } from "@/types/EquipmentState";
import { EquipmentStateHistory } from "@/types/EquipmentStateHistory";
import React, { useEffect, useState } from "react";

const EquipmentStateHistoryComponent: React.FC<{ equipmentId: string }> = ({
  equipmentId,
}) => {
  const [stateHistory, setStateHistory] =
    useState<EquipmentStateHistory | null>(null);
  const [equipmentStates, setEquipmentStates] = useState<EquipmentState[]>([]);

  useEffect(() => {
    const fetchStateHistory = async () => {
      try {
        const response = await fetch("/data/equipmentStateHistory.json");
        const data: EquipmentStateHistory[] = await response.json();

        const history = data.find((item) => item.equipmentId === equipmentId);
        setStateHistory(history || null);
      } catch (error) {
        console.error("Erro ao carregar o histórico:", error);
      }
    };

    const fetchEquipmentStates = async () => {
      try {
        const response = await fetch("/data/equipmentState.json");
        const data: EquipmentState[] = await response.json();
        setEquipmentStates(data);
      } catch (error) {
        console.error("Erro ao carregar os estados dos equipamentos:", error);
      }
    };

    fetchStateHistory();
    fetchEquipmentStates();
  }, [equipmentId]);

  if (!stateHistory) {
    return <p>Histórico de estados não encontrado.</p>;
  }

  return (
    <div>
      <ul>
        {stateHistory.states.map((state, index) => {
          const stateDetails = equipmentStates.find(
            (s) => s.id === state.equipmentStateId
          );
          return (
            <Card className='mt-10 w-full rounded-md1 border-black' style={{ backgroundColor: stateDetails?.color }}>
                <CardContent className='p-8' key={index}>
                <li key={index}>
                    <CardTitle>Data: {new Date(state.date).toLocaleString()}</CardTitle>
                    <br />
                    <CardDescription className="font-bold text-black">Estado: {stateDetails?.name} </CardDescription>
                </li>
                </CardContent>
            </Card>
          );
        })}
      </ul>
    </div>
  );
};

export default EquipmentStateHistoryComponent;
