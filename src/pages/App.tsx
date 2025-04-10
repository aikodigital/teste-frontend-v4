import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import equipmentData from '../../data/equipment.json'
import equipmentModelData from '../../data/equipmentModel.json'
import equipmentStateData from '../../data/equipmentState.json'
import equipmentPositionHistory from '../../data/equipmentPositionHistory.json'
import equipmentStateHistory from '../../data/equipmentStateHistory.json'
import { create } from 'zustand'
import { EquipmentPositionHistory, Position } from '@/@types/equipmentPositionHistory'
import { EquipmentState } from '@/@types/equipmentStateHistory'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

type EquipmentPositionMap = Record<string, string>
type EquipmentId = string

interface EquipmentsStore {
  selected: EquipmentId | null
  setSelected: (equipmentId: EquipmentId | null) => void
}

const useEquipmentsStore = create<EquipmentsStore>((set) => ({
  selected: null,
  setSelected: (equipmentId) => set({ selected: equipmentId }),
}))

const getLastItemHistory = (arr: Position[]) => arr?.[arr.length - 1]
const getLastItemState = (arr: EquipmentState[]) => arr?.[arr.length - 1]

const App = () => {
  const [equipmentStates, setEquipmentStates] = useState<EquipmentPositionMap>({})
  const [equipmentPositions, setEquipmentPositions] = useState<EquipmentPositionHistory[]>([])
  const { selected, setSelected } = useEquipmentsStore()

  useEffect(() => {
    const latestPositions: EquipmentPositionHistory[] = equipmentPositionHistory.map((eq) => {
      const lastPos = getLastItemHistory(eq.positions)
      return {
        equipmentId: eq.equipmentId,
        ...lastPos,
      }
    })

    const latestStates = equipmentStateHistory.reduce((acc, eq) => {
      const lastState = getLastItemState(eq.states)
      acc[eq.equipmentId] = lastState?.equipmentStateId
      return acc
    }, {} as EquipmentPositionMap)

    setEquipmentPositions(latestPositions)
    setEquipmentStates(latestStates)
  }, [])

  const getEquipment = (id: string | undefined) => equipmentData.find((e) => e.id === id)
  const getState = (id: string | undefined) => equipmentStateData.find((s) => s.id === id)
  const getModel = (id: string | undefined) => equipmentModelData.find((m) => m.id === id)

  const renderHistory = (equipmentId: string) => {
    const stateHistory = equipmentStateHistory.find((e) => e.equipmentId === equipmentId)
    const positionHistory = equipmentPositionHistory.find((e) => e.equipmentId === equipmentId)

    const productivity = (() => {
      let total = 0,
        operando = 0
      stateHistory?.states.forEach((s, idx, arr) => {
        const start = new Date(s.date)
        const end = new Date(arr[idx + 1]?.date || new Date())
        const hours = (end.getTime() - start.getTime()) / 1000 / 3600
        total += hours
        if (getState(s.equipmentStateId)?.name === 'Operando') operando += hours
      })
      return total ? ((operando / total) * 100).toFixed(1) : '0'
    })()

    const earnings = (() => {
      const model = getModel(getEquipment(equipmentId)?.equipmentModelId)
      if (!model) return 0
      return stateHistory?.states
        .reduce((sum, s, idx, arr) => {
          const start = new Date(s.date)
          const end = new Date(arr[idx + 1]?.date || new Date())
          const hours = (end.getTime() - start.getTime()) / 1000 / 3600
          const value =
            model.hourlyEarnings.find((v) => v.equipmentStateId === s.equipmentStateId)?.value || 0
          return sum + hours * value
        }, 0)
        .toFixed(2)
    })()

    return (
      <div className="p-4">
        <h3 className="mb-2 text-lg font-bold">Histórico de {getEquipment(equipmentId)?.name}</h3>
        <p className="mb-2">
          Produtividade: <strong>{productivity}%</strong>
        </p>
        <p className="mb-2">
          Ganho Total: <strong>R$ {earnings}</strong>
        </p>
        <hr className="my-2" />
        <main className="overflow-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
          <h3 className="font-semibold">Estados:</h3>
          <ul className="ml-4 list-disc text-sm">
            {stateHistory?.states.map((s, i) => {
              const state = getState(s.equipmentStateId)
              return (
                <li key={i} >
                  {new Date(s.date).toLocaleString()} - <span style={{ color: state?.color }}>{state?.name}</span>
                </li>
              )
            })}
          </ul>
          <h3 className="mt-4 font-semibold">Trajeto:</h3>
          <ul className="ml-4 list-disc text-sm">
            {positionHistory?.positions.map((p, i) => (
              <li key={i}>
                {new Date(p.date).toLocaleString()} - [{p.lat.toFixed(4)}, {p.lon.toFixed(4)}]
              </li>
            ))}
          </ul>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      <MapContainer center={[-19.1, -45.9]} zoom={10} className="z-0 flex-1">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {equipmentPositions.map((pos) => {
          const stateId = equipmentStates[pos.equipmentId]
          const state = getState(stateId)
          const color = state?.color || '#333'
          const divIcon = L.divIcon({
            className: 'rounded-full',
            html: `<div style="background: ${color}; width: 100%; height: 100%; border-radius: 9999px;"/>`,
            iconSize: [16, 16],
          })

          return (
            <Marker
              key={pos.equipmentId}
              position={[pos.lat, pos.lon]}
              eventHandlers={{
                click: () => setSelected(pos.equipmentId),
              }}
              icon={divIcon}
            >
              <Tooltip>
                <strong className="block">{getEquipment(pos.equipmentId)?.name}</strong>
                <div className="flex items-center gap-1.5">
                  Estado: {state?.name}{' '}
                  <div
                    style={{ background: color }}
                    className="inline-block h-3 w-3 rounded-full"
                  />
                </div>
              </Tooltip>
            </Marker>
          )
        })}
      </MapContainer>

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Informações do Equipamento</SheetTitle>
            <SheetDescription className="sr-only" />
          </SheetHeader>
          {selected && renderHistory(selected)}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default App
