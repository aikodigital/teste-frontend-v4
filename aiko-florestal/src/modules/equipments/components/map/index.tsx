import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

import useEquipmentData from '@/hooks/useEquipments';
import { ConvertDate } from '@/utils/convertDate';
import { FindColorByStatus } from '@/utils/findColor';
import { GetModelIcon } from '@/utils/getIconModal';

interface MapProps {
   search: string;
   selectedState: string;
   model: string;
   id?: string;
}

export const Map = ({ search, selectedState, model, id }: MapProps) => {
   const navigate = useNavigate();
   const { equipmentsMapped } = useEquipmentData();
   const idOrNot = id ? equipmentsMapped.filter(equip => equip.id === id) : equipmentsMapped;

   const filteredData = idOrNot.filter((equip) => {
      return (
         equip.name.toLowerCase().includes(search.toLowerCase()) &&
         (selectedState ? equip.status === selectedState : true) &&
         (model ? equip.modelName === model : true)
      );
   });

   return (
      <MapContainer center={[-19.126536, -45.947756]} zoom={10} style={{ height: '98vh', zIndex: "1" }}>
         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
         {filteredData.map(equipment => {
            const lastPosition = equipment.position;
            const positionHistory = equipment.positions;
            const polylinePositions = positionHistory.map(pos => [pos.lat, pos.lon]);
            if (!lastPosition) return null;

            const icon = L.icon({
               iconUrl: GetModelIcon(equipment.modelName),
               iconSize: [25, 41],
            });

            return (
               <div key={equipment.id}>
                  <Marker
                     position={[lastPosition.lat, lastPosition.lon]}
                     icon={icon}
                  >
                     <Popup>
                        <div>
                           <h2 className="font-semibold text-lg text-gray-700">{equipment.name} - <span>
                              <span className={`px-2 py-1 text-xs rounded-full text-white
                                  ${FindColorByStatus(equipment.status)}`}>
                                 {equipment.status}
                              </span>
                           </span>
                           </h2>
                           <p className="text-sm text-gray-500">{equipment.modelName}</p>
                           <p className="text-sm text-gray-500">Posição: {lastPosition.lat}, {lastPosition.lon}</p>
                           <div className='flex justify-between'>
                              <p className="text-sm text-gray-500 mt-2">{ConvertDate(lastPosition.date)}</p>
                              <p
                                 className="text-sm text-green-400 mt-2 cursor-pointer"
                                 onClick={() => navigate(`/equipments/${equipment.id}`)}
                              >Ver detalhes</p>
                           </div>
                        </div>
                     </Popup>
                  </Marker>

                  {id && (
                     <Fragment>
                        <Polyline positions={polylinePositions as any} color="green" />
                        {positionHistory.map((position, index) => (
                           <Marker
                              key={index}
                              position={[position.lat, position.lon]}
                           >
                              <Popup>
                                 <div>
                                    <h3 className="font-semibold text-gray-700">Data: {ConvertDate(position.date)}</h3>
                                    <p className="text-sm text-gray-500">Latitude: {position.lat}</p>
                                    <p className="text-sm text-gray-500">Longitude: {position.lon}</p>
                                 </div>
                              </Popup>
                           </Marker>
                        ))}
                     </Fragment>
                  )}
               </div>
            );
         })}
      </MapContainer>
   );
};
