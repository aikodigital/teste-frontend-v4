import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Equipment } from "@/types/Equipment";
import { useEffect, useState } from "react";
import MapComponent from "./map";
import {
  getEquipment,
  getEquipmentPositionHistory,
  getEquipmentState,
  getEquipmentStateHistory,
  getStateNameById,
} from "@/app/services/actions";
import { Position } from "@/types/Position";

export default function EquipmentPosition() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(
    null
  );
  const [positions, setPositions] = useState<Position[]>([]);
  const [lastState, setLastState] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equipmentData = await getEquipment();
        const stateHistoryData = await getEquipmentStateHistory();
        const statesData = await getEquipmentState();

        const stateMap = new Map(
          stateHistoryData.map((history: any) => {
            const latestState = history.states[history.states.length - 1];
            return [history.equipmentId, latestState.equipmentStateId];
          })
        );

        const equipmentDetails = equipmentData.map((equipment) => {
          const latestStateId = stateMap.get(equipment.id);

          let latestStateName: string | undefined;
          if (typeof latestStateId === "string") {
            latestStateName = getStateNameById(latestStateId, statesData);
          }

          return {
            ...equipment,
            latestStateName: latestStateName,
          };
        });
        setEquipment(equipmentDetails);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPositionHistory = async () => {
      if (selectedEquipment) {
        try {
          const positionHistoryData = await getEquipmentPositionHistory();

          const selectedEquipmentHistory = positionHistoryData.find(
            (item: any) => item.equipmentId === selectedEquipment
          );

          if (selectedEquipmentHistory) {
            const convertedPositions = selectedEquipmentHistory.positions.map(
              (pos: any) => ({
                lat: pos.lat,
                lng: pos.lon,
                date: pos.date,
              })
            );

            const limitedPositions = convertedPositions.slice(-20);
            setPositions(limitedPositions);

            const selectedEquipmentDetails = equipment.find(
              (item) => item.id === selectedEquipment
            );
            setLastState(selectedEquipmentDetails?.latestStateName ?? "");
          } else {
            setPositions([]);
            setLastState("");
          }
        } catch (error) {
          console.error("Erro ao carregar o histórico:", error);
        }
      }
    };
    fetchPositionHistory();
  }, [selectedEquipment, equipment]);

  return (
    <div>
      <h3 className="text-lg font-medium mb-10 font-semibold">
        Histórico de Posições do Equipamento
      </h3>

      <div className="mb-20">
        <Select onValueChange={(value) => setSelectedEquipment(value)}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Selecione um Equipamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Equipamentos</SelectLabel>
              {equipment.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {positions.length > 0 && (
        <MapComponent positions={positions} lastState={lastState} />
      )}
    </div>
  );
}
