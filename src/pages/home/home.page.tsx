import { useEquipmentPositionHistory } from "@/hooks/use-equipment-position-history.hook";
import { Map } from "./_components/map.component";

export default function HomePage() {
  const { equipmentsPosition, equipmentsPositionLoading } =
    useEquipmentPositionHistory();
  if (equipmentsPositionLoading) console.log("equipmentsLoading...");
  return (
    <div className="w-full h-full">
      <Map equipmentsPosition={equipmentsPosition} />
    </div>
  );
}
