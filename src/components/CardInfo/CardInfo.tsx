import { MappedEquipmentDataProps } from "@/src/types/Equipment";
import { FaClipboardList } from "react-icons/fa";

export default function CardInfo({
  equipmentData,
  cardSelected,
  handleOpenDrawer,
}: {
  equipmentData: MappedEquipmentDataProps;
  cardSelected?: boolean;
  handleOpenDrawer: () => void;
}) {
  return (
    <div
      className="w-full flex items-center border border-gray-200 rounded-md p-4 shadow-md justify-between"
      style={{ borderBottom: cardSelected ? "4px solid #085cad" : "" }}
    >
      <div className="flex flex-col">
        <div className=" w-full flex gap-2">
          <h4 className="font-bold ">Equipamento:</h4>
          <span>{equipmentData?.name}</span>
        </div>
        <div className=" w-full flex gap-2">
          <h4 className="font-bold ">Modelo:</h4>
          <span>{equipmentData?.equipmentModel?.name}</span>
        </div>
        <div className=" w-full flex gap-2">
          <h4 className="font-bold ">Último Status:</h4>
          <span className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: equipmentData?.lastState?.color }}
            />
            {equipmentData?.lastState?.name}
          </span>
        </div>
        <div className=" w-full flex gap-2">
          <h4 className="font-bold">Última Atualização:</h4>
          <span>
            {equipmentData?.lastState?.date} as {equipmentData?.lastState?.time}
          </span>
        </div>
      </div>
      <button
        className="hover:opacity-50 cursor-pointer"
        onClick={handleOpenDrawer}
      >
        <FaClipboardList size={20} />
      </button>
    </div>
  );
}
