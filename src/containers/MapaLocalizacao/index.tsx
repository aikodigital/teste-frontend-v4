import React, { useState, useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Polyline
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import { MapWrapper } from './styles'
import equipmentData from '../../data/equipment.json'
import equipmentModelData from '../../data/equipmentModel.json'
import equipmentStateData from '../../data/equipmentState.json'
import equipmentPositionHistoryData from '../../data/equipmentPositionHistory.json'
import equipmentStateHistoryData from '../../data/equipmentStateHistory.json'
import iconOperando from '../../assets/icon-operando.png'
import iconParado from '../../assets/icon-parado.png'
import iconManutencao from '../../assets/icon-manutencao.png'

export type PositionHistory = {
  date: string
  lat: number
  lon: number
}

export type StateHistory = {
  date: string
  state: string
}

export type MarkerData = {
  id: string
  name: string
  model: string
  state: string
  stateColor: string
  geocode: [number, number]
  icon: Icon
  positionHistory: PositionHistory[]
  stateHistory: StateHistory[]
}

const createIcon = (stateName: string): Icon => {
  const iconMap: { [key: string]: string } = {
    operando: iconOperando,
    parado: iconParado,
    manutenção: iconManutencao
  }

  return new Icon({
    iconUrl: iconMap[stateName.toLowerCase()] || iconOperando,
    iconSize: [38, 38],
    iconAnchor: [12, 24],
    className: 'custom-icon'
  })
}

const getMostRecentEntry = <T extends { date: string }>(entries: T[]): T =>
  entries.reduce((latest, current) =>
    new Date(current.date) > new Date(latest.date) ? current : latest
  )

export type MapaLocalizacaoProps = {
  filtro: string
  busca: string
}

const MapaLocalizacao = ({ filtro, busca }: MapaLocalizacaoProps) => {
  const [markers, setMarkers] = useState<MarkerData[]>([])
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(
    null
  )

  useEffect(() => {
    const equipmentModels = Object.fromEntries(
      equipmentModelData.map((model) => [model.id, model])
    )
    const equipmentStates = Object.fromEntries(
      equipmentStateData.map((state) => [state.id, state])
    )

    const mappedMarkers: MarkerData[] = (equipmentData as any[])
      .map((equipment) => {
        const model = equipmentModels[equipment.equipmentModelId]
        const positionHistory =
          equipmentPositionHistoryData.find(
            (pos) => pos.equipmentId === equipment.id
          )?.positions || []
        const stateHistory =
          equipmentStateHistoryData.find(
            (state) => state.equipmentId === equipment.id
          )?.states || []

        if (!positionHistory.length || !stateHistory.length) return null

        const recentPosition = getMostRecentEntry(positionHistory)
        const recentState = getMostRecentEntry(stateHistory)
        const state = equipmentStates[recentState.equipmentStateId]
        const icon = createIcon(state.name)

        return {
          id: equipment.id,
          name: equipment.name,
          model: model.name,
          state: state.name,
          stateColor: state.color,
          geocode: [recentPosition.lat, recentPosition.lon],
          icon,
          positionHistory,
          stateHistory: stateHistory.map((s) => ({
            date: s.date,
            state: equipmentStates[s.equipmentStateId]?.name || 'Unknown'
          }))
        }
      })
      .filter(Boolean) as MarkerData[]

    const filteredMarkers = mappedMarkers.filter((marker) => {
      const matchesBusca = [marker.name, marker.model, marker.state].some(
        (field) => field.toLowerCase().includes(busca.toLowerCase())
      )

      if (filtro === 'todas') return matchesBusca

      const isModeloFilter = [
        'caminhão de carga',
        'harvester',
        'garra traçadora'
      ].includes(filtro)
      return isModeloFilter
        ? marker.model.toLowerCase() === filtro && matchesBusca
        : marker.state.toLowerCase() === filtro && matchesBusca
    })

    setMarkers(filteredMarkers)
  }, [filtro, busca])

  const handleMarkerClick = (marker: MarkerData) => {
    setSelectedEquipment(marker.id)
    const positionHistory = marker.positionHistory
      .map((pos) => `Date: ${pos.date}, Lat: ${pos.lat}, Lon: ${pos.lon}`)
      .join('\n')

    const stateHistory = marker.stateHistory
      .map((state) => `Date: ${state.date}, State: ${state.state}`)
      .join('\n')

    alert(
      `Name: ${marker.name}\nModel: ${marker.model}\n\nPosition History:\n${positionHistory}\n\nState History:\n${stateHistory}`
    )
  }

  return (
    <MapWrapper>
      <MapContainer
        center={[-19.93, -43.93]}
        zoom={7}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <React.Fragment key={marker.id}>
            <Marker
              position={marker.geocode}
              icon={marker.icon}
              eventHandlers={{ click: () => handleMarkerClick(marker) }}
            >
              <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                <strong>{marker.name}</strong>
                <br />
                Model: {marker.model}
                <br />
                State:{' '}
                <span style={{ color: marker.stateColor }}>{marker.state}</span>
              </Tooltip>
            </Marker>
            {selectedEquipment === marker.id &&
              marker.positionHistory.length > 1 && (
                <Polyline
                  positions={marker.positionHistory.map((pos) => [
                    pos.lat,
                    pos.lon
                  ])}
                  color="blue"
                  weight={3}
                  opacity={0.6}
                />
              )}
          </React.Fragment>
        ))}
      </MapContainer>
      <button onClick={() => setSelectedEquipment(null)}>Clear</button>
    </MapWrapper>
  )
}

export default MapaLocalizacao
