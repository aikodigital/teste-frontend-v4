"use client";

import { Equipment } from "@/types/Equipment";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EquipmentStateHistoryComponent from "./stateList";

const EquipmentState: React.FC = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(
    null
  );

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

  return (
    <>
      <div className="flex flex-column">
        <div>
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
        
      </div>

      <div className="mt-10">

        {selectedEquipment && (
          <EquipmentStateHistoryComponent equipmentId={selectedEquipment} />
        )}
      </div>
    </>
  );
};

export default EquipmentState;
