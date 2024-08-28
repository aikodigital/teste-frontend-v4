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
import { Button } from "@/components/ui/button";
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
        <div className="ml-10">
          <Button>Buscar Estados</Button>
        </div>
      </div>

      <div>
        <EquipmentStateHistoryComponent equipmentId="a7c53eb1-4f5e-4eba-9764-ad205d0891f9" />
      </div>
    </>
  );
};

export default EquipmentState;
