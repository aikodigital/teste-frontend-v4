import { MapComponent } from "./_components/map.component";
import { EquipmentDetailsComponent } from "./_components/equipment-details.component";
import { DialogSearchComponent } from "./_components/dialog-search.component";

export default function HomePage() {
  return (
    <div className="w-full h-full">
      <MapComponent />
      <EquipmentDetailsComponent />
      <DialogSearchComponent />
    </div>
  );
}
