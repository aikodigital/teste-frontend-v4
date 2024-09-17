import { useEffect, useState } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import MarkerLatest from "../../assets/MarkerLatest.svg"
import MarkerDefault from "../../assets/DefaultIcon.svg"
import L from "leaflet"

interface Position {
  lat: number
  lon: number
  date: string
}

interface MachineData {
  equipmentId: string
  positions: Position[]
}

interface StateData {
  equipmentId: string
  states: { date: string, equipmentStateId: string }[]
}

interface StateInfo {
  id: string
  name: string
  color: string
}

interface ModelInfo {
  id: string
  name: string
}

interface Equipment {
  id: string
  equipmentModelId: string
}

interface ProcessedMachine {
  id: string
  positions: Position[]
  stateName: string
  stateColor: string
  modelName: string
}

interface LocateMachinesProps {
  machineId: string | null
}

export const LocateMachines = ({ machineId }: LocateMachinesProps) => {
  const [machines, setMachines] = useState<ProcessedMachine[]>([])
  const defaultCenter: [number, number] = [-19.126536, -45.947756]
  const defaultZoom = 9

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
      ]: [
        MachineData[],
        StateData[],
        StateInfo[],
        ModelInfo[],
        Equipment[]
      ]) => {
        const stateInfoMap = stateInfoData.reduce<
          Record<string, { name: string, color: string }>
        >((acc, state) => {
          acc[state.id.toLowerCase()] = {
            name: state.name,
            color: state.color,
          }
          return acc
        }, {})

        const modelInfoMap = modelInfoData.reduce<Record<string, string>>(
          (acc, model) => {
            acc[model.id.toLowerCase()] = model.name
            return acc
          },
          {}
        )

        const equipmentMap = equipmentData.reduce<Record<string, string>>(
          (acc, equipment) => {
            acc[equipment.id.toLowerCase()] =
              equipment.equipmentModelId.toLowerCase()
            return acc
          },
          {}
        )

        const processedMachines: ProcessedMachine[] = positionsData.map(
          (machine) => {
            const machineIdLower = machine.equipmentId.toLowerCase()

            const equipmentModelId = equipmentMap[machineIdLower]
            const modelName =
              modelInfoMap[equipmentModelId] || "Modelo Desconhecido"

            const stateData = statesData.find(
              (state) => state.equipmentId.toLowerCase() === machineIdLower
            )
            const latestStateId =
              stateData?.states[
                stateData.states.length - 1
              ]?.equipmentStateId.toLowerCase()
            const stateInfo = stateInfoMap[latestStateId] || {
              name: "Desconhecido",
              color: "#000",
            }

            return {
              id: machine.equipmentId,
              positions: machine.positions,
              stateName: stateInfo.name,
              stateColor: stateInfo.color,
              modelName: modelName,
            }
          }
        )

        setMachines(processedMachines)
      }
    )
  }, [])

  const selectedMachine = machines.find((machine) => machine.id === machineId)

  const latestPositionIcon = new L.Icon({
    iconUrl: MarkerLatest,
    iconSize: [50, 65],
    iconAnchor: [17, 45],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  })

  const defaultIcon = new L.Icon({
    iconUrl: MarkerDefault,
    iconSize: [30, 40],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  })

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <MapContainer
        center={
          selectedMachine
            ? [
                selectedMachine.positions[0].lat,
                selectedMachine.positions[0].lon,
              ]
            : defaultCenter
        }
        zoom={defaultZoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {selectedMachine &&
          selectedMachine.positions.map((position, index) => {
            const isLatestPosition =
              index === selectedMachine.positions.length - 1
            return (
              <Marker
                key={index}
                position={[position.lat, position.lon]}
                icon={isLatestPosition ? latestPositionIcon : defaultIcon}
              >
                <Popup>
                  <br />
                  Nome da máquina: {selectedMachine.modelName}
                  <br />
                  Data: {new Date(position.date).toLocaleString()}
                  {isLatestPosition && (
                    <>
                      <br />
                      Estado atual:{" "}
                      <span style={{ color: selectedMachine.stateColor }}>
                        {selectedMachine.stateName}
                      </span>
                    </>
                  )}
                </Popup>
              </Marker>
            )
          })}
        {selectedMachine && (
          <Polyline
            positions={selectedMachine.positions.map((position) => [
              position.lat,
              position.lon,
            ])}
            color={selectedMachine.stateColor}
          />
        )}
      </MapContainer>
    </div>
  )
}

export default LocateMachines
