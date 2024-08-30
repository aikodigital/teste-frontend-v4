import './styles.css'

import L from 'leaflet'
import { useState } from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'

import craneIcon from '../../assets/crane-fill.svg'
import tractorIcon from '../../assets/tractor-fill.svg'
import truckIcon from '../../assets/truck-trailer-fill.svg'
import useEquipmentData from '../../hooks/useEquipmentDataReducer'
import HistoryModal from '../HistoryModal'

interface FullStateHistory {
  equipmentState:
    | {
        id: string
        name: string
        color: string
      }
    | undefined
  date: string
  equipmentStateId: string
}

interface Position {
  date: string
  lat: number
  lon: number
}

function MapBox() {
  const iconTruck = new L.Icon({
    iconUrl: truckIcon,
    className: 'truck-icon',
    iconSize: [38, 38],
    popupAnchor: [0, -5],
  })

  const iconHarvester = new L.Icon({
    iconUrl: tractorIcon,
    className: 'tractor-icon',
    iconSize: [38, 38],
    popupAnchor: [0, -5],
  })

  const iconCrane = new L.Icon({
    iconUrl: craneIcon,
    className: 'crane-icon',
    iconSize: [38, 38],
    popupAnchor: [0, -5],
  })

  const {
    equipmentPositionCenter,
    filteredEquipmentData,
    resetFilters,
    filterItems,
    equipmentFullData,
  } = useEquipmentData()

  const [selectedModel, setSelectedModel] = useState<string>()
  const [selectedState, setSelectedState] = useState<string>()
  const [path, setPath] = useState<Array<number[]>>()

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') {
      setSelectedModel(undefined)
      filterItems({ stateId: selectedState })
      return
    }

    const modelId = e.target.value
    setPath(undefined)
    setSelectedModel(modelId)
    filterItems({ modelId, stateId: selectedState })
  }

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') {
      setSelectedState(undefined)
      filterItems({ modelId: selectedModel })
      return
    }

    const stateId = e.target.value
    setPath(undefined)
    setSelectedState(stateId)
    filterItems({ stateId, modelId: selectedModel })
  }

  const handleResetFilters = () => {
    setPath(undefined)
    setSelectedModel('')
    setSelectedState('')
    resetFilters()
  }

  const [open, setOpen] = useState(false)
  const [historyState, setHistoryState] = useState<FullStateHistory[] | null>(
    null,
  )
  const [historyStateEquipmentName, setHistoryStateEquipmentName] =
    useState<string>('')

  const handleOpen = ({
    history,
    equipmenteName,
  }: {
    history: FullStateHistory[]
    equipmenteName: string
  }) => {
    setHistoryStateEquipmentName(equipmenteName)
    setHistoryState(history)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const sortByDate = (array: Position[]) => {
    return array.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )
  }

  const handlePath = (id: string) => {
    const equipment = equipmentFullData.find((eq) => eq.id === id)
    const equipmentPositionsSorted = sortByDate(
      equipment?.positionHistory?.positions || [],
    )
    const equipmentPath = equipmentPositionsSorted
      .slice(Math.max(equipmentPositionsSorted.length - 10, 0)) // last 10 positions
      .map((item) => [item.lat, item.lon])

    setPath(equipmentPath)
  }

  const handleResetPath = () => {
    setPath(undefined)
  }

  return (
    <div className="map-box">
      <HistoryModal
        open={open}
        handleClose={handleClose}
        fullStateHistory={historyState as FullStateHistory[]}
        equipmentName={historyStateEquipmentName}
      />
      <div className="filter-box">
        <select
          className="select"
          value={selectedModel}
          onChange={handleModelChange}
        >
          <option value="">Selecione Modelo</option>
          <option value="a3540227-2f0e-4362-9517-92f41dabbfdf">
            Caminhão de carga
          </option>
          <option value="a4b0c114-acd8-4151-9449-7d12ab9bf40f">
            Harvester
          </option>
          <option value="9c3d009e-0d42-4a6e-9036-193e9bca3199">
            Garra traçadora
          </option>
        </select>

        <select
          className="select"
          value={selectedState}
          onChange={handleStateChange}
        >
          <option value="">Selecione Estado</option>
          <option value="03b2d446-e3ba-4c82-8dc2-a5611fea6e1f">
            Manutenção
          </option>
          <option value="baff9783-84e8-4e01-874b-6fd743b875ad">Parado</option>
          <option value="0808344c-454b-4c36-89e8-d7687e692d57">Operando</option>
        </select>

        <button className="reset-button" onClick={handleResetFilters}>
          Limpar Filtros
        </button>
        <button className="reset-button path-button" onClick={handleResetPath}>
          Limpar Caminho
        </button>
      </div>

      <section className="map-legend">
        <div className="map-legend-item">
          <img src={craneIcon} alt="" />
          <span>Garra traçadora</span>
        </div>
        <div className="map-legend-item">
          <img src={truckIcon} alt="" />
          <span>Caminhão de carga</span>
        </div>
        <div className="map-legend-item">
          <img src={tractorIcon} alt="" />
          <span>Harvester</span>
        </div>
      </section>
      {equipmentFullData.length > 0 && (
        <MapContainer
          center={[equipmentPositionCenter.lat, equipmentPositionCenter.lon]}
          zoom={11}
          scrollWheelZoom={true}
          className="map-container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {path && path.length >= 1 && (
            <Polyline
              pathOptions={{ color: 'lime' }}
              positions={path as [number, number][]}
            />
          )}
          {filteredEquipmentData?.map((equipment) => (
            <Marker
              key={equipment.id}
              position={[
                equipment.lastPosition.lat,
                equipment.lastPosition.lon,
              ]}
              icon={
                equipment.model?.name === 'Caminhão de carga'
                  ? iconTruck
                  : equipment.model?.name === 'Harvester'
                    ? iconHarvester
                    : iconCrane
              }
            >
              <Popup>
                <div className="map-popup-container">
                  <div className="map-popup-title">
                    <h2>{equipment.name}</h2>
                  </div>
                  <div className="map-popup-title">
                    <div
                      className="status-dot"
                      style={{
                        backgroundColor:
                          equipment.lastState.equipmentState?.color,
                      }}
                    />
                    Estado do equipamento:{' '}
                    {equipment.lastState.equipmentState?.name}
                  </div>

                  <div className="buttons-container">
                    <button
                      className="popup-button"
                      onClick={() => handlePath(equipment.id)}
                    >
                      Mostrar trajeto
                    </button>
                    <button
                      className="popup-button"
                      onClick={() =>
                        handleOpen({
                          history: equipment.fullStateHistory,
                          equipmenteName: equipment.name,
                        })
                      }
                    >
                      Historico
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  )
}

export default MapBox
