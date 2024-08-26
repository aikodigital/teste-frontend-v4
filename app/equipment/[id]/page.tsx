"use client";

import equipmentDetails from "@/app/data/equipment.json";
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
    <div>
      <h1>{equipment.name}</h1>
    </div>
  );
};

export default EquipamentPage;
