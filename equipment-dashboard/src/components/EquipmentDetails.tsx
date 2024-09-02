import { FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import { MdAccessTime } from 'react-icons/md';

interface EquipmentDetailsProps {
    selectedEquipmentId: string | null;
    enrichedStateHistory: {
        stateName: string;
        stateColor: string;
        date: string;
        equipmentStateId: string;
    }[];
}

const EquipmentDetails: React.FC<EquipmentDetailsProps> = ({ selectedEquipmentId, enrichedStateHistory }) => {

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-300 space-y-4 max-w-md mx-auto">
            <div className="flex items-center gap-3">
                <FaInfoCircle className="text-2xl text-blue-500" />
                <span className="text-xs font-medium text-gray-700">
                    Selecione uma máquina no mapa para ver seu histórico aqui
                </span>
            </div>

            {selectedEquipmentId && (
                <div>
                    <span className="text-xs font-medium text-gray-700">
                        {selectedEquipmentId}
                    </span>
                </div>
            )}

            {enrichedStateHistory.length > 0 && (
                <div className="w-full max-h-[500px] h-full overflow-auto space-y-3 pr-2">
                    {enrichedStateHistory.map((state, index) => (
                        <div
                            key={index}
                            className="px-4 py-3 border-l-4 rounded-lg bg-gray-100"
                            style={{ borderColor: state.stateColor }}
                        >
                            <div className="flex items-center space-x-4 mb-1">
                                <p className="font-semibold text-sm" style={{ color: state.stateColor }}>
                                    {state.stateName}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <p className="text-sm text-gray-700 flex items-center space-x-2">
                                    <FaCalendarAlt className="text-gray-500" />
                                    <span>{new Date(state.date).toLocaleDateString()}</span>
                                </p>
                                <p className="text-sm text-gray-700 flex items-center space-x-2">
                                    <MdAccessTime className="text-gray-500" />
                                    <span>{new Date(state.date).toLocaleTimeString()}</span>
                                </p>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EquipmentDetails;
