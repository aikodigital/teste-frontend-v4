import TooltipContent from "../TooltipContent";
import Leaflet, { LatLngExpression } from "leaflet";
import equipmentsPositionHistoryServices from "../../services/equipmentsPositionHistoryServices";
import { IEquipmentsPositionHistory, IPositions } from "../../services/types";
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet'

import './styles.css'
import 'leaflet/dist/leaflet.css'

import shadow from 'leaflet/dist/images/marker-shadow.png'
import marker from 'leaflet/dist/images/marker-icon.png'
import marker2x from 'leaflet/dist/images/marker-icon-2x.png'

export default function Map({ getSelectedEquipment }: { getSelectedEquipment: () => void }): JSX.Element {
    const { getEquipmentsPositionHistory } = equipmentsPositionHistoryServices()
    
    const title = {
        att: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }

    const EquipmentIcon = Leaflet.icon({
        iconRetinaUrl: marker2x,
        iconUrl: marker,
        shadowUrl: shadow,
    })
    
    const equipmentsPositionHistory = getEquipmentsPositionHistory()
    
    function getLatestEquipmentsLocation() {
        return equipmentsPositionHistory.map((equip: IEquipmentsPositionHistory) => {
            const latestPos = equip.positions.at(-1)
            return {
                equipmentId: equip.equipmentId,
                positions: latestPos,
            }
        })
    }

    function getMapCenter(): LatLngExpression | undefined {
        const center: LatLngExpression = [0, 0]
        getLatestEquipmentsLocation().map((equip) => {
            center[0] += (equip.positions as IPositions)?.lat
            center[1] += (equip.positions as IPositions)?.lon
        })
        const maxEquips = getLatestEquipmentsLocation().length
        if (maxEquips > 0) return [center[0] / maxEquips, center[1] / maxEquips]
        else return center
    }

    return (
        <MapContainer center={getMapCenter()} zoom={11}>
            <TileLayer
                url={title.url}
                attribution={title.att}
            />
            {getLatestEquipmentsLocation().map((equip) =>
                <Marker
                    icon={EquipmentIcon}
                    position={[(equip.positions as IPositions)?.lat, (equip.positions as IPositions)?.lon]}
                    eventHandlers={{
                        click: () => {
                            history.pushState({}, '', equip.equipmentId)
                            getSelectedEquipment()
                        }
                    }}
                >
                    <Tooltip>
                        <TooltipContent equipmentId={equip.equipmentId} />
                    </Tooltip>
                </Marker>)}

        </MapContainer>
    )
}