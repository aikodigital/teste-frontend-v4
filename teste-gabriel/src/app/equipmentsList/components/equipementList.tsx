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

        setEquipment(equipmentData);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10 w-full">
      <h3 className="text-lg font-medium">Listagem de Equipamentos</h3>
      <DataTable columns={columns} data={equipment} />
    </div>
  );
};

export default EquipmentList;
