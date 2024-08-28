"use client";

import { DataTable } from "@/components/ui/data-table";
import { Equipment } from "@/types/Equipment";
import { columns } from "./columns";
import React, { useEffect, useState } from "react";

const EquipmentList: React.FC = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equipmentResponse = await fetch("/data/equipment.json");
        const equipmentData: Equipment[] = await equipmentResponse.json();

        const modelResponse = await fetch("/data/equipmentModel.json");
        const modelData = await modelResponse.json();

        const modelMap = new Map(
          modelData.map((model: any) => [model.id, model.name])
        );

        const equipmentWithModel = equipmentData.map((equipment) => ({
          ...equipment,
          modelName: modelMap.get(equipment.equipmentModelId),
        }));

        setEquipment(equipmentWithModel);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10 w-full">
      <div className="flex justify-center">
        <h3 className="text-lg font-medium mb-10 font-semibold">
          Listagem de Equipamentos
        </h3>
      </div>
      <DataTable columns={columns} data={equipment} />
    </div>
  );
};

export default EquipmentList;
