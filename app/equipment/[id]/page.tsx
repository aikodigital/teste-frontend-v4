"use client";

import equipmentDetails from "@/app/data/equipment.json";
import equipmentModels from "@/app/data/equipmentModel.json";
import equipmentPositionHistory from "@/app/data/equipmentPositionHistory.json";
import equipmentStateHistory from "@/app/data/equipmentStateHistory.json";

import { useEffect, useState } from "react";

interface EquipamentPageProps {
  params: {
    id: string;
  };
}

const EquipamentPage = ({ params }: EquipamentPageProps) => {
  const [equipment, setEquipment] = useState<(typeof equipmentDetails)[0]>({
    id: "",
    name: "",
    equipmentModelId: "",
  });

  useEffect(() => {
    const equipmentFinded = equipmentDetails.find((row) => {
      return row.id === params.id;
    });

    if (equipmentFinded) {
      setEquipment(equipmentFinded);
    }
  }, [params.id]);

  return (
    <section className="p-5">
      <h1 className="text-xl font-semibold">{equipment.name}</h1>
      <h2>
        {
          equipmentModels.find(
            (model) => model.id === equipment.equipmentModelId
          )?.name
        }
      </h2>
    </section>
  );
};

export default EquipamentPage;
