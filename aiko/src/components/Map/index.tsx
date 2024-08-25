import PopupContent from "../PopupContent";
import equipmentServices from "../../services/equipment/equipment";
import Leaflet, { LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import './styles.css'
import 'leaflet/dist/leaflet.css'

import marker from 'leaflet/dist/images/marker-icon.png'
import marker2x from 'leaflet/dist/images/marker-icon-2x.png'
import shadow from 'leaflet/dist/images/marker-shadow.png'


export default function Map(): JSX.Element {
    const { getEquipmentsPositionHistory } = equipmentServices()

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
        return equipmentsPositionHistory.map(equip => {
            const latestPos = equip.positions.sort().reverse()[0]
            return {
                equipmentId: equip.equipmentId,
                positions: latestPos,
            }
        })
    }

    function getMapCenter(): LatLngExpression | undefined {
        const center: LatLngExpression = [0, 0]
        getLatestEquipmentsLocation().map((equip) => {
            center[0] += equip.positions.lat
            center[1] += equip.positions.lon
        })
        const maxEquips = getLatestEquipmentsLocation().length
        if (maxEquips > 0) return [center[0] / maxEquips, center[1] / maxEquips]
        else return center
    }

    return (
        <MapContainer center={getMapCenter()} zoom={10}>
            <TileLayer
                url={title.url}
                attribution={title.att}
            />
            {getLatestEquipmentsLocation().map((equip) => <Marker position={[equip.positions.lat, equip.positions.lon]} icon={EquipmentIcon}>
                <Popup>
                    <PopupContent equipmentId={equip.equipmentId} />
                </Popup>
            </Marker>)}

        </MapContainer>
    )
}