import EquipmentsSection from "@/components/EquipmentsSection";
import { structureData } from "@/composables/structureData";
import equipmentsData from "@/data/equipment.json";
import equipmentsPositionsData from "@/data/equipmentPositionHistory.json";

export default async function RootPage() {
  const equipments = structureData(equipmentsData, equipmentsPositionsData);

  return (
    <div className="container mx-auto h-[calc(100%-97px)] p-2">
      <EquipmentsSection equipments={equipments} />
    </div>
  );
}
