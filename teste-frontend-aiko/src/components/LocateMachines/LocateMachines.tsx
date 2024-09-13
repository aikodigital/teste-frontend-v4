import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Position {
  lat: number;
  lon: number;
}

interface MachineData {
  equipmentId: number;
  positions: Position[];
}

interface MachineInfo {
  id: string;
  name: string;
  hourlyEarnings: { equipmentStateId: string; value: number }[];
}

interface ProcessedMachine {
  id: number;
  lat: number;
  lng: number;
  name: string;
}

export const LocateMachines = () => {
  const [machines, setMachines] = useState<ProcessedMachine[]>([]);
  const defaultCenter = [-19.126536, -45.947756];
  const defaultZoom = 12;

  useEffect(() => {
    Promise.all([
      fetch("/data/equipmentPositionHistory.json").then((response) =>
        response.json()
      ),
      fetch("/data/equipmentModel.json").then((response) => response.json()),
    ]).then(([positionsData, infoData]: [MachineData[], MachineInfo[]]) => {
      const infoMap = new Map<number, string>();
      infoData.forEach((info) => {
        infoMap.set(parseInt(info.id), info.name); // Retornando para int
      });

      const processedMachines = positionsData.map((machine) => {
        return {
          id: machine.equipmentId,
          lat: machine.positions[machine.positions.length - 1].lat,
          lng: machine.positions[machine.positions.length - 1].lon,
          name: infoMap.get(machine.equipmentId) || "Desconhecida", 
        };
      });
      setMachines(processedMachines);
    });
  }, []);


  return (
    <div style={{ height: "80vh", width: "50%" }}>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: "100%", width: "100%" }}
      >
        {machines.map((machine) => (
          <Marker key={machine.id} position={[machine.lat, machine.lng]}>
            <Popup>
              {machine.name}
              <br />
              Máquina ID: {machine.id}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LocateMachines;
