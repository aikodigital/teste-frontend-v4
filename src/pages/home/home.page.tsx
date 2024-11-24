import { Map } from "./_components/map.component";
import { EquipmentDetailsComponent } from "./_components/equipment-details.component";

export default function HomePage() {
  return (
    <div className="w-full h-full">
      <Map />
      <EquipmentDetailsComponent />
    </div>
  );
}
