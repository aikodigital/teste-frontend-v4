import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  OverlayView
} from '@react-google-maps/api'
import type {
  EquipmentTrack,
  EquipmentStateHistory,
  EquipmentModel
} from '@/types/equipment'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchStateLegend } from '@/store/stateLegendSlice'
import { fetchEquipmentList } from '@/store/equipmentListSlice'
import { EquipmentInfo } from '@/types/equipment'

type MapProps = {
  onShowHistory: (id: string) => void
  selectedEquipmentId: string | null
}

const defaultCenter = { lat: -19.0047, lng: -45.9622 }

function Map({ onShowHistory, selectedEquipmentId }: MapProps) {
  const dispatch = useAppDispatch()
  const mapRef = useRef<google.maps.Map | null>(null)
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const [zoomLevel, setZoomLevel] = useState<number>(8)

  const [equipments, setEquipments] = useState<EquipmentTrack[]>([])
  const [latestStates, setLatestStates] = useState<Record<string, string>>({})
  const [equipmentModels, setEquipmentModels] = useState<
    Record<string, EquipmentModel>
  >({})

  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  })

  const loadingLegend = useAppSelector(state => state.stateLegend.loading)
  const stateLegend = useAppSelector(state => state.stateLegend.data)
  const equipmentList = useAppSelector(state => state.equipmentList.data)

  useEffect(() => void dispatch(fetchStateLegend()), [dispatch])
  useEffect(() => void dispatch(fetchEquipmentList()), [dispatch])

  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      const listener = map.addListener('zoom_changed', () => {
        setZoomLevel(map.getZoom() || 8);
      });
  
      return () => {
        google.maps.event.removeListener(listener);
      };
    }
  }, []);
  

  useEffect(() => {
    fetch('/data/equipmentPositionHistory.json')
      .then(res => res.json())
      .then(setEquipments)
      .catch(console.error)
  }, [])

  useEffect(() => {
    fetch('/data/equipmentStateHistory.json')
      .then(res => res.json())
      .then((data: EquipmentStateHistory[]) => {
        const latest = Object.fromEntries(
          data.map(({ equipmentId, states }) => {
            const last = states.reduce((a, b) =>
              new Date(a.date) > new Date(b.date) ? a : b
            )
            return [equipmentId, last.equipmentStateId]
          })
        ) as Record<string, string>

        setLatestStates(latest)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    fetch('/data/equipmentModel.json')
      .then(res => res.json())
      .then((data: EquipmentModel[]) => {
        const modelMap = Object.fromEntries(
          data.map(model => [model.id, model])
        )
        setEquipmentModels(modelMap)
      })
      .catch(console.error)
  }, [])

  const getDropPinSvgIcon = (
    color: string,
    showBorder = false
  ): google.maps.Icon => {
    const stroke = showBorder ? 'white' : 'none'
    const strokeWidth = showBorder ? 3 : 0
    const svg = `
      <svg width="32" height="48" viewBox="0 -10 50 50" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="dropShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="black" flood-opacity="0.4"/>
          </filter>
        </defs>
        <path d="M16 0C7.16 0 0 7.16 0 16C0 28 16 48 16 48C16 48 32 28 32 16C32 7.16 24.84 0 16 0Z" fill="#333" filter="url(#dropShadow)"/>
        <circle cx="16" cy="16" r="8" fill="${color}" stroke="${stroke}" stroke-width="${strokeWidth}"/>
      </svg>`
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
      scaledSize: new google.maps.Size(32, 48),
      anchor: new google.maps.Point(16, 48)
    }
  }

  const filteredEquipments = useMemo(
    () =>
      equipments.filter(eq => {
        const info = equipmentList[eq.equipmentId]
        return (
          (!selectedModel || info?.equipmentModelId === selectedModel) &&
          (!selectedState || latestStates[eq.equipmentId] === selectedState)
        )
      }),
    [equipments, equipmentList, selectedModel, selectedState, latestStates]
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase()
    const found = Object.entries(equipmentList).find(
      ([equipmentId, eq]: [string, EquipmentInfo]) =>
        eq.name.toLowerCase() === search || equipmentId.toLowerCase() === search
    )

    if (found) {
      const [foundId] = found
      const equipment = equipments.find(eq => eq.equipmentId === foundId)
      if (equipment) {
        const latestPos = equipment.positions.reduce((a, b) =>
          new Date(a.date) > new Date(b.date) ? a : b
        )
        mapRef.current?.panTo({ lat: latestPos.lat, lng: latestPos.lon })
        onShowHistory(foundId)
        if (searchInputRef.current) searchInputRef.current.value = ''
      }
    }
  }

  const clearFilters = () => {
    setSelectedModel(null)
    setSelectedState(null)
    onShowHistory('')
    if (searchInputRef.current) searchInputRef.current.value = ''
  }

  return (
    <div className="w-full h-full relative">
      {!loadingLegend && isLoaded && (
        <>
          <div
            className="absolute top-3 left-3 z-10 bg-white p-3 rounded-lg shadow-md max-w-full space-y-2"
            style={{
              width: `calc(70% - 2rem)`,
              transform: `scale(${Math.max(0.8, 1 - zoomLevel * 0.05)})`,
              transformOrigin: 'top left'
            }}
          >
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar por nome ou ID..."
              onChange={handleSearch}
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring"
            />
            <div className="flex flex-wrap gap-2">
              <select
                className="flex-1 min-w-[10rem] border border-gray-300 rounded px-2 py-1 text-sm"
                value={selectedModel ?? ''}
                onChange={e => setSelectedModel(e.target.value || null)}
              >
                <option value="">Todos os modelos</option>
                {Object.entries(equipmentModels).map(([id, model]) => (
                  <option key={id} value={id}>
                    {model.name}
                  </option>
                ))}
              </select>
              <select
                className="flex-1 min-w-[10rem] border border-gray-300 rounded px-2 py-1 text-sm"
                value={selectedState ?? ''}
                onChange={e => setSelectedState(e.target.value || null)}
              >
                <option value="">Todos os estados</option>
                {Object.entries(stateLegend).map(([id, state]) => (
                  <option key={id} value={id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={clearFilters}
              className="px-3 py-1 text-sm rounded bg-gray-100 border border-gray-300 hover:bg-gray-200"
            >
              Limpar Filtros
            </button>
          </div>

          <GoogleMap
            mapContainerStyle={{ height: '100%' }}
            center={defaultCenter}
            zoom={zoomLevel}
            options={{
              mapTypeControl: true,
              mapTypeControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT
              }
            }}
            onLoad={map => {
              mapRef.current = map
            }}
          >
            {filteredEquipments.map(equipment => {
              const info = equipmentList[equipment.equipmentId]
              const model = equipmentModels[info?.equipmentModelId]
              const latestPos = equipment.positions.reduce((a, b) =>
                new Date(a.date) > new Date(b.date) ? a : b
              )
              const stateId = latestStates[equipment.equipmentId]
              const color = stateLegend[stateId]?.color
              const name = info?.name ?? 'Equipamento desconhecido'
              const stateName =
                stateLegend[stateId]?.name ?? 'Estado desconhecido'
              const isHovered = hoveredId === equipment.equipmentId
              const isSelected = selectedEquipmentId === equipment.equipmentId
              const showBorder = isHovered || isSelected
              const icon = color
                ? getDropPinSvgIcon(color, showBorder)
                : undefined

              return (
                <div key={equipment.equipmentId}>
                  <Marker
                    position={{ lat: latestPos.lat, lng: latestPos.lon }}
                    onClick={() => onShowHistory(equipment.equipmentId)}
                    onMouseOver={() => setHoveredId(equipment.equipmentId)}
                    onMouseOut={() => setHoveredId(null)}
                    icon={icon}
                    animation={
                      isSelected ? google.maps.Animation.BOUNCE : undefined
                    }
                    title={name}
                  />
                  {isSelected && (
                    <OverlayView
                      position={{ lat: latestPos.lat, lng: latestPos.lon }}
                      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                      <div className="inline-block bg-gray-800/95 text-white rounded px-3 py-1 text-sm whitespace-nowrap shadow-2xl">
                        <ul>
                          <li>
                            <b>{name}</b>
                          </li>
                          <li>
                            <b>ID:</b> {equipment.equipmentId}
                          </li>
                          <li>
                            <b>Modelo:</b> {model?.name ?? 'Desconhecido'}
                          </li>
                          <li>
                            <b>Status:</b> {stateName}
                          </li>
                        </ul>
                      </div>
                    </OverlayView>
                  )}
                </div>
              )
            })}
          </GoogleMap>

          <div
            className="absolute bottom-5 right-15 bg-white p-4 rounded-xl shadow-lg z-10 w-40 font-light max-h-[50vh] overflow-y-auto"
            style={{
              transform: `scale(${Math.max(0.5, 1 - zoomLevel * 0.05)})`,
              transformOrigin: 'bottom right'
            }}
          >
            <h2 className="font-semibold text-gray-700 mb-2">Legenda</h2>
            <ul className="space-y-1">
              {Object.values(stateLegend).map(legend => (
                <li key={legend.id} className="flex items-center">
                  <span
                    className="w-4 h-4 rounded-full mr-2 border"
                    style={{ backgroundColor: legend.color }}
                  ></span>
                  <span className="text-gray-800">{legend.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

export default Map
