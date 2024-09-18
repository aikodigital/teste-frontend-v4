import CardInfo from "../CardInfo/CardInfo";
import { useContextDataEquipments } from "../../context/ContextDataEquipments";
import { useState } from "react";
import DrawerEquipments from "../Drawer/DrawerEquipments";

export default function EquipmentsData() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { equipmentList, cardSelected } = useContextDataEquipments();
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);

  const handleClickedCardSelected = (id: string) => {
    setOpenDrawer(true);
    const equipment = equipmentList.find((equipment) => equipment.id === id);
    setSelectedEquipment(equipment);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedEquipment(null);
  };

  return (
    <div className="w-full relative p-4">
      <h1 className="w-full text-center font-bold text-[24px] text-gray-700 mb-4">
        Equipamentos e Localizações
      </h1>
      <div className="grid w-full overflow-y-auto gap-2 h-[70vh]">
        {equipmentList.map((equipment) => (
          <CardInfo
            key={equipment.id}
            equipmentData={equipment}
            cardSelected={equipment.id === cardSelected}
            handleOpenDrawer={() => handleClickedCardSelected(equipment.id)}
          />
        ))}
      </div>
      <DrawerEquipments
        openDrawer={openDrawer}
        closeDrawer={onCloseDrawer}
        equipment={selectedEquipment}
      ></DrawerEquipments>
    </div>
  );
}
