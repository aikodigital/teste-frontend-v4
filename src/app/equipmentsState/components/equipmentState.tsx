"use client";

import { Equipment } from "@/types/Equipment";
import EquipmentStateHistoryComponent from "./stateList";
import React, { useEffect, useState } from "react";
import { getEquipment } from "@/app/services/actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EquipmentState() {
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
      <h3 className="text-lg font-medium mb-10 font-semibold">
        Histórico de Estados do Equipamento
      </h3>
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
}
