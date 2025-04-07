import React, { useEffect, useState } from 'react';
import './map.css'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import EquipmentsNav from '../../components/EquipmentsNav/equipmentsnav';
import useHandleEquipmentBehavior from '../../hooks/useHandleEquipmentBehavior';
import { Filter, X } from 'lucide-react';
import FilterContainer from '../../components/Filter/filtercontainer';
import equipmentModel from '../../data/equipmentModel.json'
import equipmentState from '../../data/equipmentState.json'

// Fix for default marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const createCustomMarkerIcon = (color) => {
    return L.divIcon({
        html: `<svg viewBox="0 0 24 24" width="36" height="36" stroke="${color}" fill="${color}" stroke-width="2">
             <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
           </svg>`,
        className: '',
        iconSize: [36, 36],
        iconAnchor: [18, 36]
    });
};

const colors = [
    "#FF5733", // Laranja vibrante
    "#33FF57", // Verde limão
    "#3357FF", // Azul forte
    "#FF33A1", // Rosa choque
    "#33FFF5", // Ciano
    "#FFD433", // Amarelo ouro
    "#8DFF33", // Verde neon
    "#FF8C33",  // Laranja queimado
    "#A133FF", // Roxo intenso
];

const Map = () => {

    const { equipments } = useHandleEquipmentBehavior()

    const [center, setCenter] = useState([0, 0]);
    const [zoom] = useState(11);
    const [loading, setLoading] = useState(true)

    const [openFilter, setOpenFilter] = useState(false)

    const [filter, setFilter] = useState({ models: [], states: [] })

    useEffect(() => {
        const equipmentModelIds = equipmentModel.map((model) => model.id)

        const equipmentStateIds = equipmentState.map((state) => (state.id))

        setFilter({
            models: equipmentModelIds,
            states: equipmentStateIds
        })
    }, [])

    const handleModelFilter = (id) => {
        setFilter((prevFilter) => {
            const updatedModels = prevFilter.models.includes(id)
                ? prevFilter.models.filter((model) => model !== id)
                : [...prevFilter.models, id];
            return { ...prevFilter, models: updatedModels };
        });
    };

    const handleStateFilter = (id) => {
        setFilter((prevFilter) => {
            const updatedStates = prevFilter.states.includes(id)
                ? prevFilter.states.filter((state) => state !== id)
                : [...prevFilter.states, id];
            return { ...prevFilter, states: updatedStates };
        });
    };

    const handleFilterDisplayEquipment = (equipment) => {
        const state = equipment?.statesIdByTime[equipment?.statesIdByTime?.length - 1]?.equipmentStateId
        return filter?.states.includes(state) && filter?.models.includes(equipment?.equipmentModelId)
    }

    useEffect(() => {
        if (equipments?.length === 0) return

        const firstEquipment = equipments[0];
        const lat = firstEquipment?.positions[0]?.lat;
        const lon = firstEquipment?.positions[0]?.lon;
        setCenter([lat, lon]);

        setLoading(false)
    }, [equipments])
    
    return (
        <div id="map-wrapper">
            {
                !loading &&
                <div style={{ height: '100vh', width: '100%' }}>
                    <MapContainer
                        center={center}
                        zoom={zoom}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            equipments.map((equipment, index) => (
                                handleFilterDisplayEquipment(equipment) &&
                                <React.Fragment key={equipment.equipmentId}>
                                    <Marker
                                        position={[
                                            equipment?.positions[equipment?.positions?.length - 1]?.lat,
                                            equipment?.positions[equipment?.positions?.length - 1]?.lon
                                        ]}
                                        icon={createCustomMarkerIcon(equipment?.statesIdByTime[equipment?.statesIdByTime?.length-1]?.color)}
                                    >
                                        <Popup>
                                            <div>
                                                <h3>{equipment.name}</h3>
                                                <p>{`Model: ${equipment?.equipmentModelName}`}</p>
                                                <p>{`Status: ${equipment?.statesIdByTime[equipment?.statesIdByTime?.length-1]?.name}`}</p>
                                                <p>{`Latitude: ${equipment?.positions[equipment?.positions?.length - 1]?.lat?.toFixed(6)}`}</p>
                                                <p>{`Longitude: ${equipment?.positions[equipment?.positions?.length - 1]?.lon?.toFixed(6)}`}</p>
                                                <p>{`Last update: ${equipment?.lastUpdate}`}</p>
                                            </div>
                                        </Popup>
                                    </Marker>
                                    <Polyline
                                        positions={equipment?.positions?.slice(-5)}
                                        color={colors[index]}
                                    />
                                </React.Fragment>
                            ))
                        }

                    </MapContainer>
                </div>
            }
            <EquipmentsNav
                equipments={equipments}
                colors={colors}
                filter={filter}
            />
            <button 
                id="filter-btn"
                onClick={() => setOpenFilter(!openFilter)}
            >
                { openFilter ? <X /> : <Filter /> }
            </button>
            { 
                openFilter && 
                <FilterContainer 
                    handleStateFilter={handleStateFilter}
                    handleModelFilter={handleModelFilter}
                    filter={filter}
                /> 
            }
        </div>
    )
}

export default Map