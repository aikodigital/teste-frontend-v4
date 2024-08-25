import Link from "next/link";
import { Equipment } from "../types/types";
import { ChevronRightIcon } from "lucide-react";

interface EquipmentItemProps {
  props: Equipment;
}

const EquipmentItem = ({ props }: EquipmentItemProps) => {
  return (
    <Link href={`/equipment/${props.equipmentModelId}`}>
      <div className="w-full py-5 px-4 rounded-lg shadow-md bg-muted flex justify-between items-center">
        <div className="flex flex-col gap-2">
            <h2 className="font-semibold">{props.name}</h2>
            <p className="text-sm text-muted-foreground">
              {props.equipmentModelId}
            </p>
        </div>
        <ChevronRightIcon size={24} />
      </div>
      
    </Link>
  );
};

export default EquipmentItem;
