import EquipmentDetails from './EquipmentDetails';
import MapContainer from './MapContainer';
import { useEnrichedStateHistory } from '../hooks/useEnrichedStateHistory';
import { useEquipment } from '../context/EquipmentContext';
import ImageLogo from '../assets/img/aiko.png';
import { FaUser } from 'react-icons/fa';
import { HiLogout } from 'react-icons/hi';

const AppContent: React.FC = () => {
    const { selectedEquipmentId, handleEquipmentClick } = useEquipment();
    const enrichedStateHistory = useEnrichedStateHistory();

    return (
        <div className="h-screen flex bg-gray-50">
            <nav className="w-[400px] flex-shrink-0 p-6 bg-white shadow-md flex flex-col justify-between border border-gray-200">
                <div className="flex flex-col flex-grow overflow-hidden">
                    <div className="flex items-center justify-center mb-6">
                        <img src={ImageLogo} alt="Company Logo" className="w-24 h-auto" />
                    </div>
                    <div className="flex-grow overflow-y-hidden">
                        <EquipmentDetails
                            selectedEquipmentId={selectedEquipmentId}
                            enrichedStateHistory={enrichedStateHistory}
                        />
                    </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center mb-4">
                        <FaUser className="w-6 h-6 text-gray-500" />
                        <div className="ml-3">
                            <p className="text-sm font-semibold text-gray-800">Nome do usuário</p>
                            <p className="text-xs text-gray-500">Admin</p>
                        </div>
                    </div>
                    <button className="w-full flex items-center justify-center mt-4 p-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition-colors">
                        <HiLogout className="mr-2" />
                        Logout
                    </button>
                </div>
            </nav>
            <main className="flex-1 bg-gray-50 overflow-hidden">
                <MapContainer onEquipmentClick={handleEquipmentClick} />
            </main>
        </div>
    );
};

export default AppContent;
