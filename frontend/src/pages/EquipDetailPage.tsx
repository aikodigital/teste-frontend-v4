import { getEquipmentDetails } from "@/helpers/equipments";
import { useEquipment } from "../context/EquipmentContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MoveLeft } from "lucide-react";
import TableStatus from "@/components/utils/TableStatus";
import { MapComponent } from "@/components/utils/MapComponent";
import { TypeEquipmentBasic } from "@/types/equipmentTypes";

const EquipDetailPage = () => {
  const navigate = useNavigate();
  const { selectedEquipment } = useEquipment();

  useEffect(() => {
    if (!selectedEquipment) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEquipment]);

  if (!selectedEquipment)
    return <div>Falha ao receber dados do equipamento</div>;

  const equipmentDetails = getEquipmentDetails(selectedEquipment);

  if (!equipmentDetails)
    return <div>falha ao receber dados dos históricos do equipamento</div>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [basicEquipment, setBasicEquipment] = useState<TypeEquipmentBasic[]>([
    {
      id: equipmentDetails.id,
      name: equipmentDetails.name,
      equipmentModelId: equipmentDetails.model!.id,
      lastPosition:
        equipmentDetails.positions[equipmentDetails.positions.length - 1],
    },
  ]);

  return (
    <>
      <div className="flex h-full">
        <div className="w-1/2 h-full">
          <MapComponent equipments={basicEquipment} />
        </div>
        <div className="flex flex-col w-1/2 h-full">
          <div className="bg-black w-full flex items-center justify-between p-4">
            <div className="flex flex-col text-white">
              <p>{equipmentDetails.model?.name}</p>
              <p>{equipmentDetails.name}</p>
            </div>
            <MoveLeft
              onClick={() => {
                navigate("/");
              }}
              className="text-white text-lg border-2 border-black hover:border-white hover:cursor-pointer rounded-xl p-1"
              size={38}
            />
          </div>
          <div className="h-1/2 flex">
            <img
              className="h-56 w-56 m-auto"
              src={equipmentDetails.model?.image}
              alt={equipmentDetails.model?.name}
            />
          </div>
          <div className="grow">
            <TableStatus equipmentData={equipmentDetails} setState={setBasicEquipment}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default EquipDetailPage;
