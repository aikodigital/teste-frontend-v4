import { APIProvider, ControlPosition, Map, MapControl } from '@vis.gl/react-google-maps'
import { useState, useRef, useCallback } from 'react'
import { MarkerWithInfoWindow } from './MarkerWithInfoWindow'
import { useEquipmentInfo } from '../hooks/useEquipmentInfo'
import { MapFilters } from './MapFilters'

import s from './MapContainer.module.css'

export function MapContainer() {
  const [openInfoWindowId, setOpenInfoWindowId] = useState(null)
  const { info, setDateFilter, setStatusFilter, setModelFilter } = useEquipmentInfo()
  const markerRefs = useRef({})

  const handleMarkerRef = (equipmentId, ref) => {
    if (ref) {
      markerRefs.current[equipmentId] = ref
    }
  }

  const removeFilters = useCallback(() => {
    setDateFilter('')
    setStatusFilter('')
    setModelFilter('')
  }, [setDateFilter, setStatusFilter, setModelFilter])

  return (
    <div className={s.mapContainer}>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Map
          mapId={'bf51a910020fa25a'}
          defaultZoom={11}
          defaultCenter={{ lat: -19.134644, lng: -46.087206 }}
          gestureHandling={'greedy'}
          disableDefaultUI
        >
          {info.map(({ equipmentId, lastPosition, equipmentName, equipmentModel, state }) => (
            <MarkerWithInfoWindow
              key={equipmentId}
              equipmentId={equipmentId}
              position={{ lat: lastPosition?.lat, lng: lastPosition?.lon }}
              equipmentName={equipmentName}
              equipmentModel={equipmentModel}
              state={state}
              markerRefs={markerRefs}
              openInfoWindowId={openInfoWindowId}
              setOpenInfoWindowId={setOpenInfoWindowId}
              handleMarkerRef={handleMarkerRef}
            />
          ))}
          <MapControl position={ControlPosition.TOP_LEFT}>
            <MapFilters
              setStatusFilter={setStatusFilter}
              setModelFilter={setModelFilter}
              setDateFilter={setDateFilter}
              removeFilters={removeFilters}
            />
          </MapControl>
        </Map>
      </APIProvider>
    </div>
  )
}
