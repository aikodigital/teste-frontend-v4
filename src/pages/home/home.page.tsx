import { EquipmentDetailsComponent } from "./_components/equipment-details.component";
import { DialogSearchComponent } from "./_components/dialog-search.component";
import { MapComponent } from "./_components/map.component";
import { AppBarComponent } from "@/components/appbar/appbar.component";

export default function HomePage() {
  return (
    <div className="w-full h-full flex flex-col items-start">
      <AppBarComponent />

      <div className="w-full h-full">
        <MapComponent />
        <EquipmentDetailsComponent />
        <DialogSearchComponent />
      </div>
    </div>
  );
}
