import { useNavigate, useParams } from "react-router-dom";
import EquipmentDetails from "../components/EquipmentDetails";
import EquipmentHistoryMap from "../components/EquipmentHistoryMap";

export default function EquipmentDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  function handleBackClick() {
    navigate('/');
  }

  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-1/4 bg-gray-800 text-white p-4 flex flex-col h-full">
        <button type="button" onClick={handleBackClick} className="bg-blue=500 text-white px-4 py-2 rounded mb-4">Voltar</button>
        <EquipmentDetails equipmentId={id!} />
      </div>

      <div className="flex-1 p-4 h-full overflow-hidden">
        <h2 className="text-lg font-semibold">Mapa de Posições</h2>
        <EquipmentHistoryMap equipmentId={ id ? id : ""} />
      </div>
    </div>
  )
}