import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {LocalShippingIcon} from '@mui/icons-material/LocalShipping';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import L from "leaflet";

interface Position {
  lat: number;
  lon: number;
}

interface MachineData {
  equipmentId: string;
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
}

interface ProcessedMachine {
  id: string;
  lat: number;
  lng: number;
  stateName: string;
  stateColor: string;
  modelName: string;
}

interface LocateMachinesProps {
  machineId: string | null;
}

interface LocateMachinesProps {
  machineId: string | null; 
}

const icons = {
  "tipo1": L.icon({
    iconUrl: "LocalShippingIcon", 
    iconSize: [25, 41], 
    iconAnchor: [12, 41], 
  }),
  "tipo2": L.icon({
    iconUrl: "/path/to/icon2.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  "tipo3": L.icon({
    iconUrl: "/path/to/icon2.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
};

export const LocateMachines = ({ machineId }: LocateMachinesProps) => {
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


  const selectedMachine = machines.find(machine => machine.id === machineId);

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <MapContainer
        center={selectedMachine ? [selectedMachine.lat, selectedMachine.lng] : defaultCenter}
        zoom={defaultZoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {selectedMachine && (
          <Marker key={selectedMachine.id} position={[selectedMachine.lat, selectedMachine.lng]}>
            <Popup>
              <br />
              Nome da máquina: {selectedMachine.modelName}
              <br />
              Estado atual:{" "}
              <span style={{ color: selectedMachine.stateColor }}>
                {selectedMachine.stateName}
              </span>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default LocateMachines;
