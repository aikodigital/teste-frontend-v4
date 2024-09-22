interface StateHistory {
  date: string;
  equipmentStateId: string;
}

interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

interface StateHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  stateHistory: StateHistory[];
  equipmentStates: EquipmentState[];
}

const StateHistoryModal: React.FC<StateHistoryModalProps> = ({
  isOpen,
  onClose,
  stateHistory,
  equipmentStates,
}) => {
  if (!isOpen) return null;

  const getStateName = (equipmentStateId: string): string => {
    const state = equipmentStates.find((s) => s.id === equipmentStateId);
    return state ? state.name : "Unknown";
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <dialog
      id="my_modal_1"
      className="modal modal-open"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-box relative overflow-hidden flex flex-col">
        <button
          onClick={onClose}
          className="flex-initial btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="flex-initial font-bold text-lg">State History</h3>
        <div className="overflow-y-auto flex-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Date</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {[...stateHistory]
                .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
                .map((state, index) => (
                  <tr key={index} className="hover">
                    <td>{formatDate(state.date)}</td>
                    <td> {getStateName(state.equipmentStateId)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </dialog>
  );
};

export default StateHistoryModal;
