import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import equipments from '../data/equipment.json'
import equipmentPositions from '../data/equipmentPositionHistory.json'
import equipmentModels from '../data/equipmentModel.json'
import equipmentStates from '../data/equipmentState.json'
import equipmentStateHistories from '../data/equipmentStateHistory.json'
import { StateFilter } from './StateFilter'
import { ModelFilter } from './ModelFilter'
import { Search } from './Search'
import { Equipment, EquipmentPositionHistory, EquipmentState, EquipmentModel } from './types'

export function Home() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<L.Map | null>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    if (mapRef.current) {
      mapInstance.current = L.map(mapRef.current).setView([-19.126536, -45.947756], 10)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current)

      addEquipmentMarkers()
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
      }
    }
  }, [selectedState, selectedModel, searchQuery])

  function getLatestState(equipmentId: string): { state: EquipmentState | null; date: string | null } {
    const history = equipmentStateHistories.find((h) => h.equipmentId === equipmentId)
    if (!history || history.states.length === 0) return { state: null, date: null }

    const sortedStates = [...history.states].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    const latestStateId = sortedStates[0].equipmentStateId
    const latestState = equipmentStates.find((s) => s.id === latestStateId)
    return { state: latestState || null, date: sortedStates[0].date }
  }

  function getEquipmentModel(modelId: string): EquipmentModel | undefined {
    return equipmentModels.find((m) => m.id === modelId)
  }

  function addEquipmentMarkers() {
    if (!mapInstance.current) return

    mapInstance.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstance.current?.removeLayer(layer)
      }
    })

    equipments.forEach((equipment: Equipment) => {
      const positionHistory = equipmentPositions.find(
        (pos: EquipmentPositionHistory) => pos.equipmentId === equipment.id
      )

      if (positionHistory && positionHistory.positions.length > 0) {
        const sortedPositions = [...positionHistory.positions].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        const latestPosition = sortedPositions[0]

        const { state: latestState, date: latestStateDate } = getLatestState(equipment.id)
        const model = getEquipmentModel(equipment.equipmentModelId)

        if (
          (selectedState && latestState?.id !== selectedState) ||
          (selectedModel && model?.id !== selectedModel) ||
          (searchQuery && !equipment.name.toLowerCase().includes(searchQuery.toLowerCase()))
        ) {
          return
        }

        const popupContent = `
          <b>Equipamento:</b> ${equipment.name}<br>
          <b>Modelo:</b> ${model?.name || 'Desconhecido'}<br>
          <b>Estado:</b> ${latestState?.name || 'Desconhecido'}<br>
          <b>Data de início:</b> ${latestStateDate ? new Date(latestStateDate).toLocaleString() : 'Desconhecido'}<br>
          <b>Posição recente:</b> ${latestPosition.date ? new Date(latestPosition.date).toLocaleString() : 'Desconhecido'}
        `

        if (mapInstance.current) {
          L.marker([latestPosition.lat, latestPosition.lon]).addTo(mapInstance.current).bindPopup(popupContent)
        }
      }
    })
  }

  function handleSearch(query: string) {
    setSearchQuery(query)
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="flex justify-center items-center space-x-4 p-4">
        <StateFilter
          states={equipmentStates}
          selectedState={selectedState}
          onStateChange={setSelectedState}
          />
        <ModelFilter
          models={equipmentModels}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          />
        <Search onSearch={handleSearch} />
      </div>
      <div className="flex-grow">
        <div
      ref={mapRef}
      style={{ height: '100vh', width: '100vw', margin: 0, padding: 0 }}
      />
      </div>
    </div>
  )
}