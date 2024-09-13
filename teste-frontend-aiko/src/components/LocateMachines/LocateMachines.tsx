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

interface StateData {
  equipmentId: string;
  states: { date: string; equipmentStateId: string }[];
}

interface StateInfo {
  id: string;
  name: string;
  color: string;
}

interface ModelInfo {
  id: string;
  name: string;
  hourlyEarnings: { equipmentStateId: string; value: number }[];
}

interface ProcessedMachine {
  id: number;
  lat: number;
  lng: number;
  name: string;
  stateName: string;
  stateColor: string;
  modelName: string;
}

export const LocateMachines = () => {
  const [machines, setMachines] = useState<ProcessedMachine[]>([]);
  const defaultCenter = [-19.126536, -45.947756];
  const defaultZoom = 8;

  useEffect(() => {
    Promise.all([
      fetch("/data/equipmentPositionHistory.json").then((response) =>
        response.json()
      ),
      fetch("/data/equipmentStateHistory.json").then((response) =>
        response.json()
      ),
      fetch("/data/equipmentState.json").then((response) => response.json()),
      fetch("/data/equipmentModel.json").then((response) => response.json()),
      fetch("/data/equipment.json").then((response) => response.json()), 
    ]).then(
      ([
        positionsData,
        statesData,
        stateInfoData,
        modelInfoData,
        equipmentData,
      ]) => {
        const stateInfoMap = stateInfoData.reduce((acc, state) => {
          acc[state.id.toLowerCase()] = {
            name: state.name,
            color: state.color,
          };
          return acc;
        }, {});

        const modelInfoMap = modelInfoData.reduce((acc, model) => {
          acc[model.id.toLowerCase()] = model.name;
          return acc;
        }, {});

        const equipmentMap = equipmentData.reduce((acc, equipment) => {
          acc[equipment.id.toLowerCase()] =
            equipment.equipmentModelId.toLowerCase();
          return acc;
        }, {});

        const processedMachines = positionsData.map((machine) => {
          const machineIdLower = machine.equipmentId.toLowerCase();

          const equipmentModelId = equipmentMap[machineIdLower];
          const modelName =
            modelInfoMap[equipmentModelId] || "Modelo Desconhecido";

          const stateData = statesData.find(
            (state) => state.equipmentId.toLowerCase() === machineIdLower
          );
          const latestStateId =
            stateData?.states[
              stateData.states.length - 1
            ]?.equipmentStateId.toLowerCase();
          const stateInfo = stateInfoMap[latestStateId] || {
            name: "Desconhecido",
            color: "#000",
          };

          return {
            id: machine.equipmentId,
            lat: machine.positions[machine.positions.length - 1].lat,
            lng: machine.positions[machine.positions.length - 1].lon,
            stateName: stateInfo.name,
            stateColor: stateInfo.color,
            modelName: modelName,
          };
        });

        setMachines(processedMachines);
      }
    );
  }, []);

  return (
    <div style={{ height: "80vh", width: "50%" }}>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {machines.map((machine) => (
          <Marker key={machine.id} position={[machine.lat, machine.lng]}>
            <Popup>
              <br />
              Nome da maquina: {machine.modelName}
              <br />
              Máquina ID: {machine.id}
              <br />
              Estado:{" "}
              <span style={{ color: machine.stateColor }}>
                {machine.stateName}
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LocateMachines;
