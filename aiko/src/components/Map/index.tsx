// Dependencies
import Leaflet from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

// Styles
import './styles.css'
import 'leaflet/dist/leaflet.css'

// Assets
import marker from 'leaflet/dist/images/marker-icon.png'
import marker2x from 'leaflet/dist/images/marker-icon-2x.png'
import shadow from 'leaflet/dist/images/marker-shadow.png'


export default function Map(): JSX.Element {
    const title = {
        att: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }

    const EquipmentIcon = Leaflet.icon({
        iconRetinaUrl: marker2x,
        iconUrl: marker,
        shadowUrl: shadow,
    })

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13}>
            <TileLayer
                url={title.url}
                attribution={title.att}
            />
            <Marker position={[51.505, -0.09]} icon={EquipmentIcon}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}