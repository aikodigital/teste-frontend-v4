import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Equipment } from "@/types/Equipment";
import { useEffect, useState } from "react";
import MapComponent from "./map";

interface Position {
    lat: number;
    lng: number;
    date: string;
}

export default function EquipmentPosition () {
    const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equipmentResponse = await fetch("/data/equipment.json");
        const equipmentData: Equipment[] = await equipmentResponse.json();
        setEquipment(equipmentData);

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
          const positionHistoryResponse = await fetch("/data/equipmentPositionHistory.json");
          const positionHistoryData = await positionHistoryResponse.json();
          
          const selectedEquipmentHistory = positionHistoryData.find((item: any) => item.equipmentId === selectedEquipment);

          if (selectedEquipmentHistory) {
           
            const convertedPositions = selectedEquipmentHistory.positions.map((pos: any) => ({
              lat: pos.lat,
              lng: pos.lon, 
              date: pos.date
            }));

            setPositions(convertedPositions);
            console.log(selectedEquipmentHistory.positions)
          } else {
            setPositions([]); 
          }
        } catch (error) {
          console.error("Erro ao carregar o histórico:", error);
        }
      }
    };
    fetchPositionHistory();
  }, [selectedEquipment]);

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
      
        {positions.length > 0 && <MapComponent positions={positions} />}
    </div>
  );
}
