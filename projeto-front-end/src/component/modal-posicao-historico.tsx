import React, { useEffect, useState } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import equipmentData from '../../../data/equipment.json';
import equipmentModelData from '../../../data/equipmentModel.json';
import equipmentPositionData from '../../../data/equipmentPositionHistory.json';
import { orderBydateObject } from '../utils/functions';
import Directions from './direction';

const ModalPosicaoHistorico = ({
  equipmentId,
  show,
  onClose,
}: {
  equipmentId: any;
  show: boolean;
  onClose: () => void;
}) => {
  const [routePositions, setRoutePositions] = useState([]);
  const [equipmentInfo, setEquipmentInfo] = useState<any>(null);
  const [mapCenter, setMapCenter] = useState({ lat: -7.11532, lng: -34.861 });

  useEffect(() => {
    if (show && equipmentId) {
      const equipmentPositions = equipmentPositionData.find(
        (e) => e.equipmentId === equipmentId
      );
      if (equipmentPositions) {
        const sortedPositions = orderBydateObject([equipmentPositions])[0].positions;
        setRoutePositions(sortedPositions);
        if (sortedPositions.length > 0) {
          setMapCenter({ lat: sortedPositions[0].lat, lng: sortedPositions[0].lon });
        }

        const equipment = equipmentData.find((e) => e.id === equipmentId);
        if (equipment) {
          const equipmentModel = equipmentModelData.find(
            (model) => model.id === equipment.equipmentModelId
          );
          setEquipmentInfo(equipment);

        }
      }
    }
  }, [show, equipmentId]);

  if (!show || !equipmentInfo) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/3 h-[80vh] md:h-[90vh] relative flex flex-col">
        <button
          className="absolute  right-6 text-white hover:bg-red-800 text-xl font-bold rounded-lg bg-red-500 px-4 py-1"
          onClick={onClose}
        >
          Fechar
        </button>
        <h2 className="text-xl font-bold mb-4">{`Histórico de Rotas: ${equipmentInfo.name}`}</h2>

        <div className="flex-grow w-full h-full">
          <APIProvider apiKey={""}>
            <Map
              style={{ width: '100%', height: '100%', borderRadius: '12px' }}
              defaultCenter={mapCenter}
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
