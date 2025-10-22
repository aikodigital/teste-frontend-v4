import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip } from "react-leaflet";
// import { LatLngExpresskion } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import data from "../../data/equipmentPositionHistory.json";
import dataState from "../../data/equipmentStateHistory.json"

export default function EquipmentsMap() {
  type Position = {
    id: string;
    lat: number;
    lon: number;
    date: string;
  }[];

  type PositionLast = {
    id: string;
    position: Position;
    state: string;
  }[]
  
  const [selected, setSelected] = useState<string | null>(null);


    const latestPositions: PositionLast = data.map(eq => {
      // posição mais recente
      const last = eq.positions.reduce((a, b) =>
        new Date(a.date) > new Date(b.date) ? a : b
    );
    
    const eqStates = dataState.find(ds => ds.equipmentId === eq.equipmentId);
    
    let lastState = null;
    
    if (eqStates && eqStates.states.length > 0) {
      lastState = eqStates.states
      .filter(s => new Date(s.date) <= new Date(last.date))
      .reduce((a, b) =>
        new Date(a.date) > new Date(b.date) ? a : b)
    }
    
    return {
      id: eq.equipmentId, 
      position: [last],
      state: lastState ? lastState.equipmentStateId : "Sem estado"
    }
  });

console.log(latestPositions);
//   const center: LatLngExpression = [-19.15, -45.99]; // ✅ Tipagem correta

  return (
    <MapContainer
      center={[-19.15, -45.99]}
      zoom={9}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {latestPositions.map(({id, position, state}) => (
        <Marker
          key={id}
          position={[position[0].lat, position[0].lon]}
          eventHandlers={{
            click: () => setSelected(id)
          }}
        >
          
          <Tooltip>{state}</Tooltip>
          <Popup>
            <b>Equipamento:</b> {id} <br />
            <b>Última atualização:</b> {new Date(position[0].date).toLocaleString()}
          </Popup>
        </Marker>
      ))}

      {selected && (
        <Polyline
          positions={data
            .find(e => e.equipmentId === selected)!
            .positions.map(p => [p.lat, p.lon])}
        />
      )}
    </MapContainer>
  );
}

