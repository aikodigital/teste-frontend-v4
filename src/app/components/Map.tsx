"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";;
import L from "leaflet";
import { Tooltip } from "react-leaflet";
import EquipmentDetails from "./EquipmentsDetails";
import { useEquipment } from "@/app/context/EquipmentContex";

const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

const equipmentImages: Record<string, string> = {
  "caminhão de carga": "https://imgs.search.brave.com/da0IdttOwME67UsmiC-wmG293EQUkjfGRjcHBiRuhvA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHNkLWdyYXR1aXRh/cy9tb2RlbG8tZGUt/Y2FtaW5oYW8tZGUt/Y2FpeGEtaXNvbGFk/b18xNDA5LTM0NjAu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MA",
  "harvester": "https://imgs.search.brave.com/6xmq5apBGsfFL0irBNIwB8B-geBuCoDReCtG0IpSuvg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzA2LzEyLzAx/LzM2MF9GXzgwNjEy/MDExMF9rd28yUnJs/bEtzY04xZnZ2NWU0/UGhsbDFPRm94dnRS/cS5qcGc",
  "garra traçadora": "https://imgs.search.brave.com/LdqPLho_p1fpCAXHJaQv35OjWfaPEANAr9vH8LpBEqE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZmYuaW5kLmJyL2lt/YWdlbnMvaW5mb3Jt/YWNvZXMvZ2FycmEt/dHJhY2Fkb3JhLWZs/b3Jlc3RhbC12ZW5k/YS0wMS53ZWJw"
};

const getCustomIcon = (imageUrl: string, borderColor: string) => {
  const html = `
    <div style="
      border: 3px solid ${borderColor};
      border-radius: 50%;
      width: 50px;
      height: 50px;
      overflow: hidden;
      background-color: white;
      box-shadow: 0 0 4px rgba(0,0,0,0.3);
    ">
      <img src="${imageUrl}" style="width: 100%; height: 100%; object-fit: cover;" />
    </div>
  `;

  return L.divIcon({
    html,
    className: "",
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0, -25],
  });
};

const EquipmentMap = () => {
  const {
    positions,
    stateHistory,
    states,
    equipments,
    equipmentModels,
    searchTerm,
    statusFilter,
  } = useEquipment();

  const getCurrentState = (equipmentId: string) => {
    const history = stateHistory.find(item => item.equipmentId === equipmentId)?.states || [];
    return history.length > 0 ? history[history.length - 1].equipmentStateId : undefined;
  };

  const validPositions = positions.flatMap(equip => equip.positions).filter(pos => pos.lat && pos.lon);
  const center = validPositions.length > 0
    ? ([
      validPositions.reduce((sum, pos) => sum + pos.lat, 0) / validPositions.length,
      validPositions.reduce((sum, pos) => sum + pos.lon, 0) / validPositions.length,
    ] as [number, number])
    : ([0, 0] as [number, number]);

  return (
    <div style={{ height: "calc(100vh - 40px)", width: "100%", zIndex: -1 }}>
      <MapContainer center={center} zoom={10} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {positions.map(equipment => {
          const equipmentInfo = equipments.find(e => e.id === equipment.equipmentId);
          if (!equipmentInfo) return null;

          const currentStateId = getCurrentState(equipment.equipmentId);
          const state = states.find(s => s.id === currentStateId);
          const model = equipmentModels.find(model => model.id === equipmentInfo.equipmentModelId);
          const modelName = model?.name ?? "";

          const nameMatch = equipmentInfo.name.toLowerCase().includes(searchTerm?.toLowerCase() ?? "");
          const statusMatch = !statusFilter || currentStateId === statusFilter;

          if (!nameMatch || !statusMatch) return null;

          const lastPosition = equipment.positions[equipment.positions.length - 1];
          const imageUrl = modelName ? equipmentImages[modelName.toLowerCase()] : "";
          const customIcon = getCustomIcon(imageUrl, state?.color || "#000000");

          return (
            <Marker
              key={equipment.equipmentId}
              position={[lastPosition.lat, lastPosition.lon]}
              icon={customIcon}
            >
              <Tooltip direction="top" offset={[0, -30]} opacity={1}>
                <div><span style={{ fontWeight: "bold", fontSize: "16px" }}>{equipmentInfo.name}</span></div>
                <div>
                  <span style={{ fontSize: "14px", marginRight: "4px" }}>Status:</span>
                  <span style={{ color: state?.color, fontWeight: "bold", fontSize: "14px" }}>{state?.name}</span>
                </div>
                <div>
                  <span style={{ fontSize: "14px", marginRight: "4px" }}>Modelo:</span>
                  <span style={{ fontSize: "14px" }}>{modelName}</span>
                </div>
              </Tooltip>
              <Popup>
                <EquipmentDetails equipmentId={equipment.equipmentId} />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default EquipmentMap;
