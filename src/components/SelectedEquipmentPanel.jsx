import { format } from "date-fns";

const SelectedEquipmentPanel = ({
  equipment,
  stateHistory,
  states,
  onClose,
}) => {
  if (!equipment) return null;

  const equipmentStateHistory = stateHistory.find(
    (h) => h.equipmentId === equipment.id
  );

  const getStateDetails = (stateId) => {
    return states.find((s) => s.id === stateId);
  };

  return (
    <div className="absolute top-0 right-0 w-[300px] h-full bg-white shadow-lg p-4 z-[999] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Detalhes: {equipment.name}</h2>
        <button onClick={onClose} className="text-red-500 text-lg font-bold">
          ✕
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-2">Histórico de Estados:</h3>
      <ul className="space-y-2">
        {equipmentStateHistory?.states.map((stateEntry, index) => {
          const state = getStateDetails(stateEntry.equipmentStateId);
          return (
            <li
              key={index}
              className="border rounded p-2 flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{state?.name}</div>
                <div className="text-sm text-gray-600">
                  {format(new Date(stateEntry.date), "dd/MM/yyyy HH:mm")}
                </div>
              </div>
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: state?.color }}
              ></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectedEquipmentPanel;