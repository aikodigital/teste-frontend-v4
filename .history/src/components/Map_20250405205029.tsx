import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import IconTruck from '../assets/Marcadores/caminhao-operando.png';
import { FilterEquips } from '../App';

type Props = {
    equips: FilterEquips[]
}

const Map = (props: Props) => {

    const { equips } = props

    const position: number[] = [-19.151801, -46.007759]

    const truckIcon = L.icon({
        iconUrl: IconTruck,
        iconSize: [50, 50],
        iconAnchor: [25, 45],
        popupAnchor: [0, -40],
    });


    console.log(equips)

    return (
        <MapContainer center={position} zoom={11} style={{ height: "801px", width: "100%" }} zoomControl={false} attributionControl={false}>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors & CartoDB'
            />
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
            />
            {equips.map((item, index: number) => (
                <Marker key={index} position={[item?.currentPosition.lat, item?.currentPosition.lon]} icon={truckIcon}>
                    <Popup>
                        {item.nameEquip}
                    </Popup>
                </Marker>
            ))}


        </MapContainer>
    );
};

export default Map;
