import { MapComponent } from "../components/utils/MapComponent";
import { getAllEquipments } from "../helpers/equipments";
import { TypeEquipmentBasic } from "../types/equipmentTypes";
import aikoLogo from "../../public/aiko.png";

export default function HomePage() {
  const equipments: TypeEquipmentBasic[] | null = getAllEquipments();

  if (!equipments) throw new Error("failed to get all equipments");

  return (
    <div className="flex h-full">
      <div className="w-1/2 h-full">
        <MapComponent equipments={equipments} />
      </div>
      <div className="w-1/2 h-full flex flex-col justify-center items-center gap-7">
        <div>
          <img src={aikoLogo} alt="aikoLogo" />
        </div>
        <div>
          <p className="text-6xl max-w-96 text-blue-900">Simplifique a gestão da operação na sua empresa</p>
        </div>
      </div>
    </div>
  );
}
