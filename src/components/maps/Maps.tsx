import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "tailwindcss/tailwind.css";
import { useContextDataEquipments } from "../../context/ContextDataEquipments";

export default function Maps({ position }: { position?: [number, number] }) {
  const { equipmentList, setCardSelected } = useContextDataEquipments();

  const handleClick = (id: string) => {
    setCardSelected(id);
  };

  return (
    <div className="relative w-full h-full">
      {position && (
        <MapContainer
          center={[-19.053373, -45.952892]}
          zoom={10}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {equipmentList.map((equip) => (
            <Marker
              key={equip.id}
              eventHandlers={{ click: () => handleClick(equip.id) }}
              position={[
                equip.lastPosition?.lat || 0,
                equip.lastPosition?.lon || 0,
              ]}
              icon={icon({
                iconUrl: equip.name.startsWith("CA")
                  ? "/img/truck.png"
                  : "/img/excavator.png",
                iconSize: [30, 30],
              })}
            >
              <Tooltip className="rounded-md">
                <div className="p-2 flex flex-col items-center justify-center text-center bg-white ">
                  <div className="flex flex-row items-center gap-1 ">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: equip.lastState?.color }}
                    />
                    <p>{equip.lastState?.name}</p>
                  </div>
                  <h1>{equip.name}</h1>
                  <p>{equip.lastState?.date ?? ""}</p>
                  <p>{equip.lastState?.time ?? ""}</p>
                </div>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}
