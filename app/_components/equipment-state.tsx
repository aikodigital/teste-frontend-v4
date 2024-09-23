import { Badge } from "./ui/badge";
import statusProps from "../data/equipmentState.json";
import { RadioIcon } from "lucide-react";

interface EquipmentStateProps {
  equipmentStateId: string;
  variant?: "badge" | "icon";
}

const EquipmentState = ({ equipmentStateId, variant="badge" }: EquipmentStateProps) => {
  const status = statusProps.filter((status) => status.id === equipmentStateId);

  if (status.length === 0) {
    return null;
  }

  return (
    <>
      {variant === "badge" ? (
        <Badge
          className="whitespace-nowrap px-2 py-1"
          style={{
            backgroundColor: status.slice(-1)[0].color,
          }}
        >
          • {status.slice(-1)[0].name}
        </Badge>
      ) : (
        <div className="p-1 flex flex-col items-center">
          <RadioIcon size={30} color={status.slice(-1)[0].color} />
          <span>{status.slice(-1)[0].name}</span>
        </div>
      )}
    </>
  );
};

export default EquipmentState;
