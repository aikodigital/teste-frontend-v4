import { MapComponent } from "./components/utils/MapComponent";
import { getAllEquipments } from "./helpers/equipments";
import equipmentModels from "../../data/equipmentModel.json";
import { TypeEquipmentBasic } from "./types/equipmentTypes";

export default function App() {
  const equipments: TypeEquipmentBasic[] | null = getAllEquipments();
  console.log(equipments);
  console.log(equipmentModels)

  if (!equipments) throw new Error("failed to get all equipments")

  const equipmentsPositions = equipments.map((equipment) => equipment.lastPosition);


  return (
    <h1 className="text-3xl font-bold underline">
      <MapComponent />
    </h1>
  );
}
