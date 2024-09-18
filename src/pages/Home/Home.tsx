import { LatLngExpression, divIcon, icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useCallback, useEffect, useState } from 'react'
import {
  FeatureGroup,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  Tooltip
} from 'react-leaflet'
import {
  getAllEquipmentStateHistory,
  getEquipment,
  getEquipmentPositionHistory,
  getEquipmentState
} from '../../api/serviceApi'
import {
  EquipmentPositionHistoryProps,
  EquipmentPositionProps,
  EquipmentProps,
  EquipmentStateHistoryProps,
  EquipmentStateProps,
  EquipmentStatesProps
} from '../../models/Equipment'

import SelectComponent from '@/components/select/select'
import { Button, buttonVariants } from '@/components/ui/button'
import { Link } from 'react-router-dom'
function Home() {
  const positionCenter: LatLngExpression = [-19.126536, -45.947756]
  const [equipment, setEquipment] = useState<EquipmentProps[]>([])
  const [equipmentState, setEquipmentState] = useState<EquipmentStateProps[]>(
    []
  )

  const [position, setPosition] =
    useState<EquipmentPositionHistoryProps | null>(null)

  const [equipmentStateHistory, setEquipmentStateHistory] = useState<
    EquipmentStateHistoryProps[]
  >([])

  const [equipmentPositionHistory, setEquipmentPositionHistory] = useState<
    EquipmentPositionHistoryProps[]
  >([])

  const [selectedEquipment, setSelectedEquipment] = useState<{
    value: string
    label: string
  } | null>(null)

  const iconMaintenance = icon({
    iconUrl: 'src/assets/Maintenance.png',
    iconSize: [38, 38]
  })

  const iconOperating = icon({
    iconUrl: 'src/assets/Operating.png',
    iconSize: [38, 38]
  })

  const iconStopped = icon({
    iconUrl: 'src/assets/Stopped.png',
    iconSize: [38, 38]
  })

  useEffect(() => {
    getEquipment().then((data: EquipmentProps[]) => setEquipment(data))

    getEquipmentState().then((data: EquipmentStateProps[]) =>
      setEquipmentState(data)
    )

    getEquipmentPositionHistory().then(
      (data: EquipmentPositionHistoryProps[]) => {
        setEquipmentPositionHistory(data)
      }
    )

    getAllEquipmentStateHistory().then((data: EquipmentStateHistoryProps[]) =>
      setEquipmentStateHistory(data)
    )
  }, [])

  const getCurrentPosition = (
    equipmentId: string
  ): EquipmentPositionProps | undefined => {
    try {
      const item = equipmentPositionHistory.find(
        item => item.equipmentId === equipmentId
      )
      if (item) {
        return item.positions.sort(
          (a: EquipmentPositionProps, b: EquipmentPositionProps) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
          }
        )[0]
      }
      return undefined
    } catch (error) {
      console.log('Erro ao buscar a posição do equipamento ', error)
    }
  }

  const getCurrentState = (
    equipmentId: string
  ): EquipmentStateProps | undefined => {
    try {
      const item = equipmentStateHistory.find(
        item => item.equipmentId === equipmentId
      )
      if (item) {
        const currentState = item.states.sort(
          (a: EquipmentStatesProps, b: EquipmentStatesProps) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime()
          }
        )[0]

        const state = equipmentState.find(
          item => item.id === currentState.equipmentStateId
        )
        return state
      }
      return undefined
    } catch (error) {
      console.log('Erro ao buscar o estado do equipamento ', error)
    }
  }

  const handleEquipmentChange = useCallback(
    (equipmentId: string): EquipmentPositionHistoryProps | undefined => {
      const history = equipmentPositionHistory.find(
        item => item.equipmentId === equipmentId
      )
      if (history) {
        history.equipment = equipment.find(item => item.id === equipmentId)
        setPosition(history)
        return history
      }
      return undefined
    },
    [equipmentPositionHistory, equipment]
  )

  const clearSelectedEquipment = () => {
    setSelectedEquipment(null)
    setPosition(null)
  }

  const optionsPolyline = {
    color: '#6FA1EC',
    weight: 5,
    opacity: 0.7
  }

  return (
    <div>
      <header className='absolute left-0 right-0 top-0 z-20 m-auto flex max-w-7xl flex-row items-center justify-between gap-3 p-4 py-4 text-white'>
        <img src='../img/aiko.png' className='w-28 opacity-60' alt='aiko' />
        <div className='rounded-md bg-gray-700 p-8 opacity-85'>
          <SelectComponent
            value={selectedEquipment}
            placeholder='Selecionar Equipamento'
            options={equipment?.map(item => ({
              value: item.id,
              label: item.name
            }))}
            clearValue={clearSelectedEquipment}
            onChange={(item: { value: string; label: string } | null) => {
              if (item) {
                setSelectedEquipment(item)
                handleEquipmentChange(item.value)
              } else {
                clearSelectedEquipment()
              }
            }}
          />
        </div>
      </header>
      <div>
        <MapContainer
          center={positionCenter}
          zoom={10}
          scrollWheelZoom={true}
          className='z-10 h-screen w-full'
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {position ? (
            <FeatureGroup>
              {position &&
                position.positions.map((mark, index) => {
                  const countPosition = index + 1
                  const lastPosition = position.positions.length
                  const markerNumberIcon = divIcon({
                    iconSize: [30, 30],
                    iconAnchor: [15, 15],
                    shadowAnchor: [4, 30],

                    className: `text-gray-800 font-bold text-lg ${countPosition === 1 ? 'bg-red-500' : countPosition === lastPosition ? 'bg-green-500' : 'bg-white'}  rounded-full flex items-center justify-center p-2`,
                    html: `<span>${countPosition}</span>`
                  })

                  return (
                    <Marker
                      key={index}
                      position={[mark.lat, mark.lon]}
                      icon={markerNumberIcon}
                    >
                      <Tooltip>
                        {countPosition} - {new Date(mark.date).toLocaleString()}
                      </Tooltip>
                    </Marker>
                  )
                })}
              <Polyline
                positions={position?.positions.map(
                  pos => [pos.lat, pos.lon] as LatLngExpression
                )}
                pathOptions={optionsPolyline}
              />
            </FeatureGroup>
          ) : (
            equipment?.map((item, index) => {
              const currentPosition = getCurrentPosition(item.id)
              const currentState = getCurrentState(item.id)
              if (!currentPosition) return null

              let icon
              switch (currentState?.name) {
                case 'Manutenção':
                  icon = iconMaintenance
                  break
                case 'Operando':
                  icon = iconOperating
                  break
                case 'Parado':
                  icon = iconStopped
                  break
                default:
                  icon = iconMaintenance
              }
              return (
                <Marker
                  position={[currentPosition.lat, currentPosition.lon]}
                  key={index}
                  icon={icon}
                >
                  <Tooltip>{currentState?.name}</Tooltip>
                  <Popup>
                    <div className='flex flex-col gap-2'>
                      <Button
                        onClick={() => {
                          handleEquipmentChange(item.id)
                          setSelectedEquipment({
                            value: item.id,
                            label: item.name
                          })
                        }}
                        variant='outline'
                        className='text-sm font-medium'
                      >
                        Histórico da posição do Equipamento
                      </Button>
                      <Link
                        className={buttonVariants({ variant: 'link' })}
                        to={`/equipment-state-history/${item.id}`}
                      >
                        Histórico do Estado do Equipamento
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              )
            })
          )}
        </MapContainer>
      </div>
    </div>
  )
}

export default Home
