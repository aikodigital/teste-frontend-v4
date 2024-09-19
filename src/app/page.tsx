import EquipmentsSection from "@/components/EquipmentsSection";
import { structureEquipmentData } from "@/composables/structureData";

import equipmentsData from "@/data/equipment.json";
import equipmentsPositionsData from "@/data/equipmentPositionHistory.json";
import equipmentsStatesData from "@/data/equipmentStateHistory.json";

export default async function RootPage() {
  const equipments = structureEquipmentData(
    equipmentsData,
    equipmentsPositionsData,
    equipmentsStatesData
  );

  return (
    <div className="container xl: max-w-[1280px]  mx-auto h-[calc(100%-97px)] p-2 ">
      <EquipmentsSection equipments={equipments} />
    </div>
  );
}
