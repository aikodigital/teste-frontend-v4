import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { IconStates } from './Icons';
import { FilterEquips, Positions } from '../App';

const Map = (props: any) => {

    const { equips, getInfoCurrentEquip, openDetails } = props

    const [currentEquip, setCurrentEquip] = useState<FilterEquips>({});

    const positionMap: Positions = equips[0].currentPosition

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
                <>
                    {currentEquip.positionHistory[0].positions.map((item, index) => (
                        <>
                            <Marker key={index} position={item} icon={IconStates(currentEquip?.equipmentModelId)} >
                                <Tooltip className="popUp" direction="top" offset={[0, -35]} opacity={1} permanent={false}>
                                    <span> Data: {item.date}</span>
                                </Tooltip>
                            </Marker>
                        </>
                    ))}
                    <Marker
                        position={currentEquip?.currentPosition}
                        icon={IconStates(currentEquip?.equipmentModelId, currentEquip?.currentState.status)}
                        eventHandlers={{
                            click: () => teste(currentEquip),
                        }} />
                </>
            ) : (
                equips.map((item: FilterEquips, index: number) => (
                    <Marker
                        key={index}
                        position={item?.currentPosition}
                        icon={IconStates(item?.equipmentModelId, item?.currentState?.status)}
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
