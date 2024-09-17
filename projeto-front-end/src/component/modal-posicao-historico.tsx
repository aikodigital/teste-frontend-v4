import React, { useEffect, useState } from 'react';
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import Havester from '../assets/Harvester.png';
import Caminhao from '../assets/Caminhão de carga.png';
import Garra from '../assets/Garra traçadora.png';
import equipmentData from '../../../data/equipment.json';
import equipmentModelData from '../../../data/equipmentModel.json';
import equipmentPositionData from '../../../data/equipmentPositionHistory.json';
import { orderBydateObject } from '../utils/functions';
import MapRoot from './direction';
import Directions from './direction';

const ModalPosicaoHistorico = ({ equipmentId, show, onClose }: { equipmentId: any, show: boolean, onClose: () => void }) => {
    const [routePositions, setRoutePositions] = useState([]);
    const [equipmentInfo, setEquipmentInfo] = useState<any>(null);
    const [icon, setIcon] = useState('');
    const [mapCenter, setMapCenter] = useState({ lat: -7.11532, lng: -34.861 });
    const [hoveredMarker, setHoveredMarker] = useState<any>(null);

    useEffect(() => {
        if (show && equipmentId) {
            // Obtém o histórico de posições do equipamento
            const equipmentPositions = equipmentPositionData.find((e) => e.equipmentId === equipmentId);
            if (equipmentPositions) {
                const sortedPositions = orderBydateObject([equipmentPositions])[0].positions;
                setRoutePositions(sortedPositions);
                if (sortedPositions.length > 0) {
                    setMapCenter({ lat: sortedPositions[0].lat, lng: sortedPositions[0].lon });
                }

                // Obtém informações sobre o equipamento e define o ícone
                const equipment = equipmentData.find((e) => e.id === equipmentId);
                if (equipment) {
                    const equipmentModel = equipmentModelData.find((model) => model.id === equipment.equipmentModelId);
                    setEquipmentInfo(equipment);

                    if (equipmentModel?.name === 'Harvester') {
                        setIcon(Havester);
                    } else if (equipmentModel?.name === 'Garra traçadora') {
                        setIcon(Garra);
                    } else if (equipmentModel?.name === 'Caminhão de carga') {
                        setIcon(Caminhao);
                    }
                }
            }
        }
    }, [show, equipmentId]);

    if (!show || !equipmentInfo) return null;



    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/3 h-3/4 relative">
                <button className="absolute top-3 right-3 text-red-500" onClick={onClose}>Fechar</button>
                <h2 className="text-xl font-bold mb-4">{`Histórico de Rotas: ${equipmentInfo.name}`}</h2>

                <div className="w-full h-full">
                    <APIProvider apiKey={""}>
                        <Map
                            style={{ width: '100%', height: '100%', borderRadius: '24px' }}
                            defaultCenter={{ lat: 43.65, lng: -79.38 }}
                            defaultZoom={12}
                            gestureHandling={'greedy'}
                            fullscreenControl={false}
                        >
                            <Directions coordinates={routePositions} />
                        </Map>
                    </APIProvider>
                </div>
            </div>
        </div>
    );
};

export default ModalPosicaoHistorico;


