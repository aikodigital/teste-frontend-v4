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
import { getEquipment } from "@/app/services/actions";

const EquipmentState: React.FC = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [selectedEquipmentId, setSelectedEquipment] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equipmentData = await getEquipment();

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

        {selectedEquipmentId && (
          <EquipmentStateHistoryComponent equipmentId={selectedEquipmentId} />
        )}
      </div>
    </>
  );
};

export default EquipmentState;
