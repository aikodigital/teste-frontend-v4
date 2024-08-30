import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import DataContext from '../data/DataContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

const customIcon = L.divIcon({
    className: 'custom-icon',
    html: '<i class="bi bi-geo-alt-fill" style="font-size:24px;"></i>',
    iconSize: [25, 35],
    popupAnchor: [0, -15],
});

function formatDate(isoDate) {
    const date = new Date(isoDate);
  
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const ano = date.getFullYear();   
  
    const hora = date.getHours().toString().padStart(2, '0');
    const minuto = date.getMinutes().toString().padStart(2,   
   '0');

    return `${hora}:${minuto} no dia ${dia}/${mes}/${ano}`;
}


let defaultPosition = [-19.151801,-46.007759]

const Maps = () => {
    const { filteredData } = useContext(DataContext);
    
    return (
        <div id='maps'>
            <MapContainer center={defaultPosition} zoom={10} id='mapContainer'>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {filteredData.map((equip, index) => (
                    <Marker key={index} position={[equip.lastPosition.lat, equip.lastPosition.lon]} icon={customIcon}>
                        <Popup>
                            <span>Máquina: {equip.name} <br/> Estado: {equip.lastState.name} às {formatDate(equip.lastPosition.date)}</span>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Maps;
