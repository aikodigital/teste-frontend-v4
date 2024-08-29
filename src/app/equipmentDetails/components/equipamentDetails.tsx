"use client";

import { Equipment } from "@/types/Equipment";
import { EquipmentModel } from "@/types/EquipmentModel";
import React, { useEffect, useState } from "react";

const EquipmentDetails: React.FC = () => {
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [model, setModel] = useState<EquipmentModel | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equipmentResponse = await fetch("/../data/equipment.json");
        console.log(equipmentResponse)
        const equipmentData: Equipment[] = await equipmentResponse.json();

        const modelResponse = await fetch("../data/equipmentModel.json");
        const modelData: EquipmentModel[] = await modelResponse.json();

        const selectedEquipment = equipmentData[0];

        const selectedModel =
          modelData.find((m) => m.id === selectedEquipment.equipmentModelId) ||
          null;

        setEquipment(selectedEquipment);
        setModel(selectedModel);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    };
    fetchData();
  }, []);

  if (!equipment || !model) {
    return <p>Equipamento ou modelo não encontrado.</p>;
  }

  return (
    <div>
      <p>
        <strong>ID:</strong> {equipment.id}
      </p>
      <strong>Equipamento::</strong> {equipment.name}
      <p>
        <strong>Modelo:</strong> {model.name}
      </p>
    </div>
  );
};

export default EquipmentDetails;
