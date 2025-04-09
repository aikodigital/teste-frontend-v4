import './App.css'
import { useEffect, useState, useMemo } from 'react'
import { MapView } from './components/MapView'
import { Filters } from './components/Filters'
import filterIcon from './assets/img/filter.png'
import {
  fetchEquipments,
  fetchPositionHistories,
  fetchEquipmentModels,
  getLatestPosition,
  fetchEquipmentStates,
  fetchEquipmentStateHistories,
  getLatestState
} from './services/equipmentService'

export type PositionData = {
  name: string
  model: string
  date: string
  lat: number
  lng: number
  stateColor: string
  stateName: string
  stateHistory?: { name: string; date: string }[]
  productivity?: number
  estimatedEarnings?: number
  path?: { lat: number; lon: number; date: string }[]
}

export type FiltersState = {
  model: string
  state: string
  name: string
  modelText: string
}

function App() {
  const [showFilters, setShowFilters] = useState(true)
  const [positions, setPositions] = useState<PositionData[]>([])
  const [filters, setFilters] = useState<FiltersState>(() => {
    const saved = localStorage.getItem('filters')
    return saved
      ? JSON.parse(saved)
      : { model: 'Todos', state: 'Todos', name: '', modelText: '' }
  })
  const [highlightName, setHighlightName] = useState<string | null>(null)
  const [visibleRoutes, setVisibleRoutes] = useState<Record<string, boolean>>({})
  const [startDate, setStartDate] = useState<string>(() => localStorage.getItem('startDate') || '')
  const [endDate, setEndDate] = useState<string>(() => localStorage.getItem('endDate') || '')

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters))
  }, [filters])

  useEffect(() => {
    localStorage.setItem('visibleRoutes', JSON.stringify(visibleRoutes))
  }, [visibleRoutes])

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (start > end) {
      alert("A data de início não pode ser maior que a data de fim. Ajuste as datas.");
      setStartDate(endDate);
    } else {
      localStorage.setItem('startDate', startDate);
      localStorage.setItem('endDate', endDate);
    }
  }, [startDate, endDate]);
  

  useEffect(() => {
    async function loadData() {
      const [equipments, histories, models, states, stateHistories] = await Promise.all([
        fetchEquipments(),
        fetchPositionHistories(),
        fetchEquipmentModels(),
        fetchEquipmentStates(),
        fetchEquipmentStateHistories(),
      ])

      const result = equipments.map(equipment => {
        const position = getLatestPosition(equipment.id, histories)
        if (!position) return null

        const historyEntry = histories.find(h => h.equipmentId === equipment.id)
        const path = historyEntry?.positions ?? []

        const model = models.find(m => m.id === equipment.equipmentModelId)
        const state = getLatestState(equipment.id, stateHistories, states)

        const equipmentStateHistory = stateHistories.find(h => h.equipmentId === equipment.id)
        const fullStateHistory = equipmentStateHistory?.states.map(entry => {
          const s = states.find(state => state.id === entry.equipmentStateId)
          return {
            name: s?.name ?? 'Estado desconhecido',
            date: entry.date,
          }
        }) ?? []

        const filteredStateHistory = fullStateHistory.filter(entry => {
          const d = new Date(entry.date)
          return (!startDate || d >= new Date(startDate)) && (!endDate || d <= new Date(endDate))
        })

        let totalHoras = 0
        let horasOperando = 0
        let ganhoEstimado = 0

        if (filteredStateHistory.length >= 2) {
          for (let i = 0; i < filteredStateHistory.length - 1; i++) {
            const atual = new Date(filteredStateHistory[i].date)
            const proxima = new Date(filteredStateHistory[i + 1].date)
            const horas = (proxima.getTime() - atual.getTime()) / 1000 / 60 / 60
            totalHoras += horas

            if (filteredStateHistory[i].name === 'Operando') {
              horasOperando += horas
              ganhoEstimado += horas * 100
            } else if (filteredStateHistory[i].name === 'Parado') {
              ganhoEstimado += horas * 30
            }
          }
        }

        const produtividade = totalHoras > 0 ? (horasOperando / totalHoras) * 100 : 0

        const lastDateFromPath = path.filter(p => {
          const d = new Date(p.date)
          return (!startDate || d >= new Date(startDate)) && (!endDate || d <= new Date(endDate))
        }).at(-1)?.date

        const lastDateFromState = filteredStateHistory.at(-1)?.date

        const finalDate = lastDateFromPath || lastDateFromState || position.date

        const displayStateName = filteredStateHistory.at(-1)?.name || state?.name || 'Estado desconhecido'
        const stateColor = state?.color ?? '#e74c3c'

        return {
          name: equipment.name,
          model: model?.name ?? 'Modelo desconhecido',
          date: finalDate,
          lat: position.lat,
          lng: position.lon,
          stateName: displayStateName,
          stateColor: stateColor,
          stateHistory: filteredStateHistory,
          productivity: Math.round(produtividade),
          estimatedEarnings: Math.round(ganhoEstimado),
          path: path.filter(p => {
            const d = new Date(p.date)
            return (!startDate || d >= new Date(startDate)) && (!endDate || d <= new Date(endDate))
          })
        }
      }).filter(Boolean) as PositionData[]

      setPositions(result)

      const savedVisibleRoutes = localStorage.getItem('visibleRoutes')
      if (savedVisibleRoutes) {
        setVisibleRoutes(JSON.parse(savedVisibleRoutes))
      } else {
        const initial = result.reduce((acc, pos) => {
          acc[pos.name] = false
          return acc
        }, {} as Record<string, boolean>)
        setVisibleRoutes(initial)
      }
    }

    loadData()
  }, [startDate, endDate])

  const filtered = positions.map((pos) => {
    const matchesModel = filters.model === 'Todos' || pos.model === filters.model
    const matchesModelText = pos.model.toLowerCase().includes(filters.modelText.toLowerCase())
    const matchesState = filters.state === 'Todos' || pos.stateName === filters.state
    const matchesName = pos.name.toLowerCase().includes(filters.name.toLowerCase())
    const matchesDate = (!startDate || new Date(pos.date) >= new Date(startDate)) &&
                        (!endDate || new Date(pos.date) <= new Date(endDate))

    return matchesModel && matchesModelText && matchesState && matchesName && matchesDate
      ? pos
      : null
  }).filter(Boolean) as PositionData[]

  const syncedRoutes = useMemo(() => {
    return filtered.reduce((acc, pos) => {
      acc[pos.name] = visibleRoutes?.[pos.name] ?? false
      return acc
    }, {} as Record<string, boolean>)
  }, [filtered, visibleRoutes])

  useEffect(() => {
    if (filters.name.trim().length > 0 && filtered.length === 1) {
      setHighlightName(filtered[0].name)
    } else {
      setHighlightName(null)
    }
  }, [filters.name, filtered])

  return (
    <>
      {positions.length === 0 ? (
        <p>Carregando dados...</p>
      ) : (
        <>
          <img
            src={filterIcon}
            alt="Toggle filtros"
            className="filter-icon-toggle"
            onClick={() => setShowFilters(prev => !prev)}
          />

          <Filters
            models={Array.from(new Set(positions.map((p) => p.model)))}
            states={['Operando', 'Parado', 'Manutenção']}
            filters={filters}
            setFilters={setFilters}
            names={Array.from(new Set(positions.map((p) => p.name)))}
            show={showFilters}
            visibleRoutes={syncedRoutes}
            setVisibleRoutes={setVisibleRoutes}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />

          <MapView
            positions={filtered}
            highlightName={highlightName}
            visibleRoutes={syncedRoutes}
            startDate={startDate}
            endDate={endDate}
          />
        </>
      )}
    </>
  )
}

export default App
