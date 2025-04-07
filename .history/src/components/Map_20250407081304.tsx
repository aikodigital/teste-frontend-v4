import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import IconTruck from '../assets/Marcadores/caminhao-operando.png';
import IconHarvester from '../assets/Marcadores/harvester-operando.png';
import IconTractor from '../assets/Marcadores/garra-tracadora-operando.png';
import { FilterEquips, Positions } from '../App';

const Map = (props: any) => {

    const { equips, getInfoCurrentEquip, openDetails } = props

    const [currentEquip, setCurrentEquip] = useState({});

    const positionMap: Positions = equips[0].currentPosition

    const truck = L.icon({
        iconUrl: IconTruck,
        iconSize: [50, 50],
        iconAnchor: [25, 45],
        popupAnchor: [0, -40],
    });

    const harvester = L.icon({
        iconUrl: IconHarvester,
        iconSize: [50, 50],
        iconAnchor: [25, 45],
        popupAnchor: [0, -40],
    });

    const tractor = L.icon({
        iconUrl: IconTractor,
        iconSize: [50, 50],
        iconAnchor: [25, 45],
        popupAnchor: [0, -40],
    });

    const getIconByType = (type: string) => {
        switch (type) {
            case 'a3540227-2f0e-4362-9517-92f41dabbfdf':
                return truck;
            case 'a4b0c114-acd8-4151-9449-7d12ab9bf40f':
                return harvester;
            case '9c3d009e-0d42-4a6e-9036-193e9bca3199':
                return tractor;
            default:
                return truck;
        }
    };

    const teste = (item: any) => {
        console.log(item)
        setCurrentEquip(item)
        getInfoCurrentEquip(item)
    }

    return (
        <MapContainer center={positionMap} zoom={11} style={{ height: "801px", width: "100%" }} zoomControl={false} attributionControl={false}>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors & CartoDB'
            />
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
            />
            {openDetails ? (
                currentEquip.positionHistory[0].positions.map((item, index) => (
                    <Marker key={index} position={item} icon={truck} />
                ))
                    (<Marker position={currentEquip?.currentPosition} icon={truck} />)
            ) : (
                equips.map((item: FilterEquips, index: number) => (
                    <Marker
                        key={index}
                        position={item?.currentPosition}
                        icon={getIconByType(item?.equipmentModelId)}
                        eventHandlers={{
                            click: () => teste(item),
                        }}
                    >
                        <Tooltip className="popUp" direction="top" offset={[0, -35]} opacity={1} permanent={false}>
                            <span>Equipamento: {item?.nameEquip}</span>
                            <span>Estado atual: {item?.currentState?.status}</span>
                            <span>ID: {item?.name}</span>
                        </Tooltip>
                    </Marker>
                ))
            )}

        </MapContainer >
    );
};

export default Map;
