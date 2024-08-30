import {
  getEquipmentState,
  getEquipmentStateHistory,
} from "@/app/services/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { EquipmentState } from "@/types/EquipmentState";
import { EquipmentStateHistory } from "@/types/EquipmentStateHistory";
import React, { useEffect, useState } from "react";

const EquipmentStateHistoryComponent: React.FC<{ equipmentId: string }> = ({
  equipmentId,
}) => {
  const [stateHistory, setStateHistory] = useState<EquipmentStateHistory>();
  const [equipmentStates, setEquipmentStates] = useState<EquipmentState[]>([]);

  useEffect(() => {
    const fetchStateHistory = async () => {
      try {
        const historyData = await getEquipmentStateHistory();

        const history = historyData.find(
          (item: { equipmentId: string }) => item.equipmentId === equipmentId
        );

        if (history) {
          history.states.sort(
            (
              stateA: {
                date: Date;
                equipmentStateId: string;
              },
              stateB: {
                date: Date;
                equipmentStateId: string;
              }
            ) =>
              new Date(stateB.date).getTime() - new Date(stateA.date).getTime()
          );
        }

        setStateHistory(history);
      } catch (error) {
        console.error("Erro ao carregar o histórico:", error);
      }
    };

    const fetchEquipmentStates = async () => {
      try {
        const stateData = await getEquipmentState();
        setEquipmentStates(stateData);
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
            <Card
              className="mt-10 w-full rounded-md1 border-black"
              style={{ backgroundColor: stateDetails?.color }}
              key={index}
            >
              <CardContent className="p-8" key={index}>
                <li key={index}>
                  <CardTitle>
                    Data: {new Date(state.date).toLocaleString()}
                  </CardTitle>
                  <CardDescription className="font-bold text-black mt-5">
                    Estado: {stateDetails?.name}{" "}
                  </CardDescription>
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
