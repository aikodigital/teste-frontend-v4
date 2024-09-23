import Image from "next/image";
import equipmentModel from "@/app/data/equipmentModel.json";
import Link from "next/link";
import EquipmentState from "./equipment-state";
import { ChevronRightIcon } from "lucide-react";

export interface EquipmentItemProps{
  equip: {
    id: string;
    name: string;
    equipmentModelId: string;
  },
  statusId: string;
}

const EquipmentItem = ({ equip, statusId }: EquipmentItemProps) => {
  return (
    <Link href={`/equipment/${equip.id}`} className="bg-background rounded-lg px-2 shadow-md py-3 flex items-center justify-between w-full hover:bg-muted transition-colors">
      <div className="flex items-center space-x-3">
        <div>
          <Image
            src={
              equip.equipmentModelId === equipmentModel[0].id
                ? "/truck.png"
                : equip.equipmentModelId === equipmentModel[1].id
                ? "/harvester.png"
                : "/tracer.png"
            }
            alt={equip.name}
            width={40}
            height={40}
            className="object-cover rounded-full"
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold">{equip.name}</h3>
            <EquipmentState equipmentStateId={statusId} />
          </div>
          <span className="text-sm">
            {
              equipmentModel.find((model) => model.id === equip.equipmentModelId)
                ?.name
            }
          </span>
        </div>
      </div>
        <div>
          <ChevronRightIcon size={20} />
        </div>
    </Link>
  );
};

export default EquipmentItem;
