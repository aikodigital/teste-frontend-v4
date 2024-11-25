import { Map } from "./_components/map.component";
import { EquipmentDetailsComponent } from "./_components/equipment-details.component";
import { DialogSearch } from "./_components/dialog-search.component";

export default function HomePage() {
  return (
    <div className="w-full h-full">
      <Map />
      <EquipmentDetailsComponent />
      <DialogSearch />
    </div>
  );
}
