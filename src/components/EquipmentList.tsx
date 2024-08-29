import { Link } from "react-router-dom";
import { Equipment } from "../types";

interface EquipmentProps {
  equipment: { id: string; name: string; equipmentModelId: string }[];
}

export default function EquipmentList({ equipment }: EquipmentProps) {
  return (
    <ul>
      {equipment.map((equip: Equipment) => (
        <li key={equip.id} className="mb-2">
          <Link to={`/equipment/${equip.id}`} className="block p-2 bg-gray-700 hover:bg-gray-600 rounded-md">
            {equip.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}