import {
  DrawerLib,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "src/lib/Drawer-lib/DrawerLib";
import CardStatus from "../CardStatus/CardStatus";
import { MappedEquipmentDataProps } from "@/src/types/Equipment";
import { FaClipboardList } from "react-icons/fa";

export default function DrawerEquipments({
  openDrawer,
  closeDrawer,
  equipment,
}: {
  openDrawer: boolean;
  closeDrawer: () => void;
  equipment: MappedEquipmentDataProps;
}) {
  return (
    <DrawerLib open={openDrawer} onClose={closeDrawer}>
      <DrawerTrigger />
      <DrawerContent className="w-1/3 shadow-lg ">
        <DrawerHeader className="w-full h-24 bg-gray-200">
          <div className="flex justify-center p-4">
            <DrawerTitle className="flex items-center gap-2">
              <FaClipboardList />
              <h1 className="font-bold ">
                Histórico de estados do equipamento
              </h1>
            </DrawerTitle>
          </div>
        </DrawerHeader>
        <div className="flex p-8 h-full w-full flex-col gap-3  ">
          <div className="flex flex-col gap-1">
            <div className="flex w-full justify-between ">
              <span className="font-bold text-gray-900">Equipamento:</span>
              <span>{equipment?.name}</span>
            </div>
            <div className="flex w-full justify-between items-center ">
              <span className="font-bold text-gray-900">Modelo:</span>
              <span>{equipment?.equipmentModel?.name}</span>
            </div>
          </div>
          <DrawerDescription className="">
            <div className="flex w-full justify-between font-bold text-gray-800 text-center p-2 pr-10 border rounded-t-md">
              <span>Estado da operação</span>
              <span> Data</span>
              <span>Hora</span>
            </div>
            <div className="overflow-y-scroll max-h-[65vh] pb-4 shadow-sm">
              {equipment?.state?.map((state: any) => (
                <CardStatus
                  key={state.date}
                  status={state.name}
                  date={state.date}
                  hours={state.time}
                  color={state.color}
                />
              ))}
            </div>
            <DrawerFooter className="p-4">
              <button
                className="bg-slate-900 text-white p-2 hover:opacity-60"
                onClick={closeDrawer}
              >
                Fechar
              </button>
            </DrawerFooter>
          </DrawerDescription>
        </div>
      </DrawerContent>
    </DrawerLib>
  );
}
