import { useEquipmentData } from "@/hooks/use-equipment-data.hook";
import { Map } from "./_components/map.component";
import { EquipmentDetailsComponent } from "./_components/equipment-details.component";

export default function HomePage() {
  const { data, loading, error } = useEquipmentData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full h-full">
      <Map equipments={data} />
      <EquipmentDetailsComponent />
    </div>
  );
}
