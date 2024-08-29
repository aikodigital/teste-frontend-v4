import { APIProvider, Map } from '@vis.gl/react-google-maps'
import { useState, useRef } from 'react'
import { MarkerWithInfoWindow } from './MarkerWithInfoWindow'

export function MapContainer({ equipmentInfo }) {
  const [openInfoWindowId, setOpenInfoWindowId] = useState(null)
  const markerRefs = useRef({})

  const handleMarkerRef = (equipmentId, ref) => {
    if (ref) {
      markerRefs.current[equipmentId] = ref
    }
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Map
          mapId={'bf51a910020fa25a'}
          defaultZoom={11}
          defaultCenter={{ lat: -19.134644, lng: -46.087206 }}
          gestureHandling={'greedy'}
          disableDefaultUI
        >
          {equipmentInfo.map(
            ({ equipmentId, lastPosition, equipmentName, equipmentModel, state }) => (
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
            ),
          )}
        </Map>
      </APIProvider>
    </div>
  )
}
