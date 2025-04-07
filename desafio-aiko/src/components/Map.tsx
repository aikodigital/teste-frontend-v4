import { MapContainer, TileLayer, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { EquipmentFullData } from "@/interface/types"
import { Icon } from "leaflet"
import { Box } from "@chakra-ui/react"

interface Props {
  data: EquipmentFullData[]
  onClickMarker: (equipmentId: string) => void
}

export const EquipmentMap = ({ data, onClickMarker }: Props) => {
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [30, 30],
  })

  return (
    <Box h="500px">
      <MapContainer center={[-15, -47]} zoom={4} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {data.map((item) =>
          item.lastPosition ? (
            <Marker
              key={item.id}
              position={[item.lastPosition.lat, item.lastPosition.lon]}
              icon={customIcon}
              eventHandlers={{
                click: () => onClickMarker(item.id),
              }}
            >
            </Marker>
          ) : null
        )}
      </MapContainer>
    </Box>
  )
}
