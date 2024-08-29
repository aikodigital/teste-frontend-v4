import { AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps'
import { useNavigate } from 'react-router-dom'
import { useEquipmentIcon } from '../hooks/useEquipmentIcon'

export function MarkerWithInfoWindow({
  equipmentId,
  position,
  equipmentName,
  equipmentModel,
  state,
  markerRefs,
  openInfoWindowId,
  setOpenInfoWindowId,
  handleMarkerRef,
}) {
  const navigate = useNavigate()

  const equipmentIcon = useEquipmentIcon(equipmentModel.name)

  return (
    <AdvancedMarker
      ref={(ref) => handleMarkerRef(equipmentId, ref)}
      position={position}
      title={equipmentName}
      onClick={() => setOpenInfoWindowId(equipmentId)}
    >
      <Pin background={state.color} borderColor={'transparent'} scale={1.4}>
        <img
          src={equipmentIcon}
          alt={equipmentModel.name}
          style={{ width: '30px', height: '30px' }}
        />
      </Pin>

      {openInfoWindowId === equipmentId && (
        <InfoWindow
          anchor={markerRefs.current[equipmentId]}
          maxWidth={200}
          onCloseClick={() => setOpenInfoWindowId(null)}
        >
          <div>
            <p>Nome: {equipmentName}</p>
            <p>Modelo: {equipmentModel.name}</p>
            <p>Status: {state.name}</p>
            <button onClick={() => navigate(`/state/details/${equipmentId}`)}>
              Histórico de status
            </button>
          </div>
        </InfoWindow>
      )}
    </AdvancedMarker>
  )
}
