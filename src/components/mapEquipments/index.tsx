import React from "react";
import styles from './MapEquipments.module.scss'
import { generateMarkerIcon } from "./marker";
import PopupMarker from "./popup";
import ModalEquipment from "../modal";
import { useEquipmentContext } from "../../context/equipment";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import { Icon } from "leaflet";

function MapEquipments(){
    const {position, activeModal, selectedEquipment, filteredEquipments} = useEquipmentContext();
    
    return(
        <div className={styles.map_container}>
            {filteredEquipments.length > 0 && (
                <MapContainer center={[filteredEquipments[0].positionCurrent?.lat || position[0], filteredEquipments[0]?.positionCurrent?.lon || position[1]]} zoom={10}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {    
                        filteredEquipments && filteredEquipments.map(list =>{
                            
                            return(
                                <Marker 
                                position={[list.positionCurrent.lat, list.positionCurrent.lon]} 
                                icon={new Icon({
                                    iconRetinaUrl: generateMarkerIcon(list.stateColor),
                                    iconSize: [25,41],
                                    iconAnchor: [12.5, 41],
                                    iconUrl: generateMarkerIcon(list.stateColor),
                                    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
                                })}
                                key={list.id}
                                >
                                    <Popup>
                                        <PopupMarker
                                            equipment={list}        
                                        />
                                    </Popup>
                                </Marker>
                            )
                        })
                    }
                </MapContainer>
            )}
            {
                activeModal && selectedEquipment ?
                    (
                        <>
                            <ModalEquipment
                            />
                        </>
                    )
                :
                ''          
            }
        </div>
    )
}

export default MapEquipments;