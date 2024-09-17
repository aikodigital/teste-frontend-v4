import './style.scss'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import {
  Agriculture,
  DirectionsCar,
  LocalShipping,
  Train
} from '@mui/icons-material'
import { renderToString } from 'react-dom/server'
import { IEquipment } from '../../../utils/globalTypes'
import { useEffect, useState } from 'react'
import store from '../../../stores/store'
import { formattedDate } from 'utils/filters'
import InputSelectWhite from 'components/inputs/inputSelectWhite'
import ButtonContained from 'components/buttons/buttonContained'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  useMediaQuery
} from '@mui/material'

const createCustomIcon = (color: string, equipment: string) => {
  const iconHTML = renderToString(
    equipment === 'Caminhão de carga' ? (
      <LocalShipping style={{ color, fontSize: '32px' }} />
    ) : equipment === 'Harvester' ? (
      <Agriculture style={{ color, fontSize: '32px' }} />
    ) : equipment === 'Garra traçadora' ? (
      <Train style={{ color, fontSize: '32px' }} />
    ) : (
      <DirectionsCar style={{ color, fontSize: '32px' }} />
    )
  )
  return L.divIcon({
    html: iconHTML,
    iconSize: [30, 42],
    className: ''
  })
}

const UpdateMapCenter = ({ position }: { position: [number, number] }) => {
  const map = useMap()

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom())
    }
  }, [position, map])

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  return null
}

const ListSelectTotalPoints = [
  { value: 'Todos', label: 'Todos' },
  { value: '5', label: '5' },
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '30', label: '30' },
  { value: '50', label: '50' }
]

export default function Maps({ body }: { body?: IEquipment }) {
  const { equipmentStates } = store.EquipmentStates()
  const [position, setPosition] = useState<[number, number]>([0, 0])
  const [selectedPoints, setSelectedPoints] = useState<string>('10')

  const [open, setOpen] = useState<boolean>(false)
  const isMobile = useMediaQuery('(max-width:900px)')

  const positionHistory = (body?.positionHistory ?? []).slice(
    selectedPoints === 'Todos' ? undefined : -parseInt(selectedPoints)
  )
  const lineCoordinates: L.LatLngTuple[] = positionHistory.map((position) => [
    position.lat,
    position.lon
  ])

  useEffect(() => {
    if (body && body.lastPositionHistory) {
      setPosition([
        body.lastPositionHistory.lat ?? 0,
        body.lastPositionHistory.lon ?? 0
      ])
    }
  }, [body])

  function setEquipmentStateColor(lastStateHistoryId: string) {
    const equipmentItem = equipmentStates.find(
      (item) => item.id === lastStateHistoryId
    )
    return equipmentItem ? equipmentItem.color : '#0046CC'
  }

  function setEquipmentStateName(lastStateHistoryId: string) {
    const equipmentItem = equipmentStates.find(
      (item) => item.id === lastStateHistoryId
    )
    return equipmentItem ? equipmentItem.name : ''
  }

  return (
    <>
      <MapContainer
        className="map"
        center={position}
        zoom={13}
        style={{ height: '400px', width: '100%', borderRadius: '20px' }}
      >
        <div className="map__total">
          <InputSelectWhite
            list={ListSelectTotalPoints}
            placeholder="Nº de Posições"
            selected={selectedPoints}
            onValueChange={(value) => setSelectedPoints(value)}
          />
        </div>
        <div className="map__history">
          <ButtonContained
            label="Histórico de estados"
            onClick={() => {
              setOpen(!open)
            }}
          />
        </div>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <UpdateMapCenter position={position} />

        {positionHistory.map((position, index) => {
          let color = '#3d485d'
          if (index === positionHistory.length - 1)
            color = setEquipmentStateColor(
              body?.lastStateHistory?.equipmentStateId ?? ''
            )
          return (
            <Marker
              key={position.date}
              position={[position.lat, position.lon]}
              icon={createCustomIcon(color, body?.name ?? '')}
              eventHandlers={{
                mouseover: (e) => {
                  e.target.openPopup()
                },
                mouseout: (e) => {
                  e.target.closePopup()
                }
              }}
            >
              <Popup autoPan={true} closeButton={false}>
                <span>
                  Atualizado em: <b>{formattedDate(position.date)}</b>
                </span>
                <span>
                  Latitude: <b>{position.lat}</b>
                </span>
                <span>
                  Longitude: <b>{position.lon}</b>
                </span>
              </Popup>
            </Marker>
          )
        })}

        <Polyline
          positions={lineCoordinates}
          color="blue"
          weight={3}
          opacity={0.5}
          dashArray="8, 8"
          lineCap="round"
          lineJoin="round"
        />
      </MapContainer>
      <SwipeableDrawer
        anchor={isMobile ? 'bottom' : 'right'}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        className="history-drawer"
      >
        <Box
          sx={{
            width: isMobile ? 'auto' : 250,
            height: isMobile ? 300 : 'auto'
          }}
          onClick={() => setOpen(false)}
          onKeyDown={() => setOpen(false)}
        >
          <List>
            {body?.stateHistory
              .slice()
              .reverse()
              .map((state, index) => (
                <ListItem key={index}>
                  <ListItemButton>
                    <ListItemIcon>
                      {body?.name === 'Caminhão de carga' ? (
                        <LocalShipping
                          style={{
                            color: setEquipmentStateColor(
                              state.equipmentStateId
                            )
                          }}
                        />
                      ) : body?.name === 'Harvester' ? (
                        <Agriculture
                          style={{
                            color: setEquipmentStateColor(
                              state.equipmentStateId
                            )
                          }}
                        />
                      ) : body?.name === 'Garra traçadora' ? (
                        <Train
                          style={{
                            color: setEquipmentStateColor(
                              state.equipmentStateId
                            )
                          }}
                        />
                      ) : (
                        <DirectionsCar
                          style={{
                            color: setEquipmentStateColor(
                              state.equipmentStateId
                            )
                          }}
                        />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={setEquipmentStateName(state.equipmentStateId)}
                      secondary={formattedDate(state.date)}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  )
}
