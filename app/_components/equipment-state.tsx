import { Badge } from "./ui/badge";
import statusProps from "../data/equipmentState.json";

interface EquipmentStateProps {
  equipmentStateId: string;
}

const EquipmentState = ({ equipmentStateId }: EquipmentStateProps) => {
  const status = statusProps.filter((status) => status.id === equipmentStateId);

  if (status.length === 0) {
    return null;
  }

  return (
    <Badge
      className="whitespace-nowrap px-2 py-1"
      style={{
        backgroundColor: status[0].color,
      }}
    >
      • {status[0].name}
    </Badge>
  );
};

export default EquipmentState;