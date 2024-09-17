import './style.scss'
import { useEffect, useState } from 'react'
import { Grid2, IconButton } from '@mui/material'
import { LocationOnOutlined } from '@mui/icons-material'
import store from '../../../stores/store'
import { formattedDate } from '../../../utils/filters'
import { IEquipmentData, IEquipmentModelData } from './types'
import {
  IEquipment,
  IEquipmentStateHistoryData,
  IEquipmentPositionHistoryData,
  IEquipmentStateData
} from '../../../utils/globalTypes'
import Maps from '../map'
import InputSelectDark from 'components/inputs/inputSelectDark'
import InputTextDark from 'components/inputs/inputText'
import EmptyState from 'components/emptyState'

const listFilterModel = [
  { value: 'Todos', label: 'Todos' },
  { value: 'a3540227-2f0e-4362-9517-92f41dabbfdf', label: 'Caminhão de carga' },
  { value: 'a4b0c114-acd8-4151-9449-7d12ab9bf40f', label: 'Harvester' },
  { value: '9c3d009e-0d42-4a6e-9036-193e9bca3199', label: 'Garra traçadora' }
]

export default function EquipmentList() {
  const [bodyMap, setBodyMap] = useState<IEquipment>()
  const [filterText, setFilterText] = useState('')
  const [selectedModel, setSelectedModel] = useState('Todos')
  const { equipment, setEquipment } = store.Equipment()
  const { equipmentStates, setEquipmentStates } = store.EquipmentStates()

  async function fetchEquipmentState() {
    const response = await fetch(
      new URL('../../../constants/equipmentState.json', import.meta.url)
    )
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON')
    }
    const json = await response.json()
    return json
  }

  async function fetchEquipment() {
    const response = await fetch(
      new URL('../../../constants/equipment.json', import.meta.url)
    )
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON')
    }
    const json = await response.json()
    return json
  }

  async function fetchEquipmentModel() {
    const response = await fetch(
      new URL('../../../constants/equipmentModel.json', import.meta.url)
    )
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON')
    }
    const json = await response.json()
    return json
  }

  async function fetchEquipmentStateHistory() {
    const response = await fetch(
      new URL('../../../constants/equipmentStateHistory.json', import.meta.url)
    )
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON')
    }
    const json = await response.json()
    return json
  }

  async function fetchEquipmentPositionHistory() {
    const response = await fetch(
      new URL(
        '../../../constants/equipmentPositionHistory.json',
        import.meta.url
      )
    )
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON')
    }
    const json = await response.json()
    return json
  }

  async function fetchData() {
    try {
      setEquipmentStates(await fetchEquipmentState())
      const equipmentData = await fetchEquipment()
      const equipmentModelData = await fetchEquipmentModel()
      const equipmentStateHistoryData = await fetchEquipmentStateHistory()
      const equipmentPositionHistoryData = await fetchEquipmentPositionHistory()

      const combinedData: IEquipment[] = equipmentData.map(
        (equipmentItem: IEquipmentData) => {
          const modelItem = equipmentModelData.find(
            (model: IEquipmentModelData) =>
              model.id === equipmentItem.equipmentModelId
          )

          const equipmentHistory = equipmentStateHistoryData.find(
            (history: IEquipmentStateHistoryData) =>
              history.equipmentId === equipmentItem.id
          )

          const equipmentPositionHistory = equipmentPositionHistoryData.find(
            (history: IEquipmentPositionHistoryData) =>
              history.equipmentId === equipmentItem.id
          )

          const equipmentTotalHoursPerState = calculateTotalHours(
            equipmentHistory.states
          )

          const hourlyEarnings = mapStateIdsToNames(modelItem.hourlyEarnings)

          const lastUpdateOperatingHours = calculateLastUpdateOperatingHours(
            equipmentHistory.states
          )

          return {
            id: equipmentItem.id,
            equipmentModelId: equipmentItem.equipmentModelId,
            name: modelItem ? modelItem.name : '',
            model: equipmentItem.name,
            hourlyEarnings: hourlyEarnings,
            stateHistory: equipmentHistory ? equipmentHistory.states : [],
            positionHistory: equipmentPositionHistory
              ? equipmentPositionHistory.positions
              : [],
            lastStateHistory:
              equipmentHistory.states[equipmentHistory.states.length - 1],
            lastPositionHistory:
              equipmentPositionHistory.positions[
                equipmentPositionHistory.positions.length - 1
              ],
            totalHoursPerState: equipmentTotalHoursPerState,
            lastDayUpdateOperatingHours: lastUpdateOperatingHours
          }
        }
      )

      setEquipment(combinedData)
      setBodyMap(combinedData[0])
    } catch (error) {
      console.error('Erro:', error)
    }
  }

  function mapStateIdsToNames(totalHours: {
    [key: string]: { equipmentStateId: string; value: number }
  }) {
    const stateNamesMap: { [key: string]: string } = {
      '0808344c-454b-4c36-89e8-d7687e692d57': 'operating',
      'baff9783-84e8-4e01-874b-6fd743b875ad': 'maintenance',
      '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f': 'stopped'
    }

    const mappedHours: { [key: string]: number } = {}

    for (const key in totalHours) {
      if (totalHours.hasOwnProperty(key)) {
        const { equipmentStateId, value } = totalHours[key]
        const stateName = stateNamesMap[equipmentStateId] || equipmentStateId
        mappedHours[stateName] = value
      }
    }

    return mappedHours
  }

  function setEquipmentStateName(lastStateHistoryId: string) {
    const equipmentItem = equipmentStates.find(
      (item) => item.id === lastStateHistoryId
    )
    return equipmentItem ? equipmentItem.name : ''
  }

  function setEquipmentStateColor(lastStateHistoryId: string) {
    const equipmentItem = equipmentStates.find(
      (item) => item.id === lastStateHistoryId
    )
    return equipmentItem ? equipmentItem.color : '#f1f1f1'
  }

  function setBodyMapItem(item: IEquipment) {
    setBodyMap(item)
  }

  function calculateTotalHours(stateHistory: IEquipmentStateData[]) {
    let totalHours = {
      totalOperating: 0,
      totalStopped: 0,
      maintenance: 0
    }

    stateHistory.forEach((state) => {
      if (state.equipmentStateId === '0808344c-454b-4c36-89e8-d7687e692d57') {
        totalHours.totalOperating++
      } else if (
        state.equipmentStateId === 'baff9783-84e8-4e01-874b-6fd743b875ad'
      ) {
        totalHours.totalStopped++
      } else {
        totalHours.maintenance++
      }
    })

    return totalHours
  }

  function calculateLastUpdateOperatingHours(
    stateHistory: IEquipmentStateData[]
  ) {
    if (stateHistory.length === 0) return 0

    const lastUpdateDate = new Date(stateHistory[stateHistory.length - 1].date)
      .toISOString()
      .split('T')[0]
    let lastUpdateOperatingHours = 0

    stateHistory.forEach((state) => {
      const stateDate = new Date(state.date).toISOString().split('T')[0]
      if (
        stateDate === lastUpdateDate &&
        state.equipmentStateId === '0808344c-454b-4c36-89e8-d7687e692d57'
      ) {
        lastUpdateOperatingHours++
      }
    })

    return lastUpdateOperatingHours
  }

  function gainPerEquipment(equipment: IEquipment) {
    let gain = 0

    if (equipment.totalHoursPerState) {
      const totalOperating = equipment.totalHoursPerState.totalOperating || 0
      const totalMaintenance =
        equipment.totalHoursPerState.totalMaintenance || 0
      const hourlyOperating = equipment.hourlyEarnings.operating || 0
      const hourlyMaintenance = equipment.hourlyEarnings.maintenance || 0

      gain =
        totalOperating * hourlyOperating + totalMaintenance * hourlyMaintenance
    }

    return gain
  }

  function lastUpdateOperatingHours(hours: number) {
    return (hours / 24) * 100
  }

  useEffect(() => {
    fetchData()
  }, [])

  const removeSpecialCharacters = (str: string) => {
    return str.replace(/[^a-zA-Z0-9 ]/g, '')
  }

  const filteredEquipment = equipment.filter((item: IEquipment) => {
    const matchesTextFilter =
      removeSpecialCharacters(item.name.toLowerCase()).includes(
        removeSpecialCharacters(filterText.toLowerCase())
      ) ||
      removeSpecialCharacters(item.model.toLowerCase()).includes(
        removeSpecialCharacters(filterText.toLowerCase())
      )

    const matchesModelFilter =
      selectedModel === 'Todos' || item.equipmentModelId === selectedModel

    return matchesTextFilter && matchesModelFilter
  })

  return (
    <Grid2 container spacing={4} className="list">
      <Maps body={bodyMap} />
      <div className="list__filter">
        <div className="list__text">
          <InputTextDark
            onValueChange={(value) => {
              setFilterText(value)
            }}
            placeholder="Pesquisar"
          />
        </div>
        <div className="list__select">
          <InputSelectDark
            list={listFilterModel}
            onValueChange={(value) => {
              setSelectedModel(value)
            }}
            placeholder="Modelo"
            selected="Todos"
          />
        </div>
      </div>
      {filteredEquipment.length > 0 ? (
        filteredEquipment.map((item: IEquipment) => (
          <Grid2
            className="list__item"
            size={{ xs: 12, md: 6, lg: 4 }}
            key={item.id}
            onClick={() => setBodyMapItem(item)}
          >
            <div className="list__border-top">
              <span className="list__border-top--left-top" />
              <span className="list__border-top--left-bottom" />
              <span className="list__border-top--right-bottom" />
              <span className="list__border-top--right-block" />
            </div>
            <div className="list__content">
              <div className="list__header">
                <span className="list__model">{item.model}</span>
                <span
                  className="list__state-name"
                  style={{
                    background: setEquipmentStateColor(
                      item.lastStateHistory.equipmentStateId
                    )
                  }}
                >
                  {item.stateHistory.length > 0
                    ? setEquipmentStateName(
                        item.lastStateHistory.equipmentStateId
                      )
                    : 'Sem histórico'}
                </span>
              </div>
              <div className="list__title">
                <span className="list__name">{item.name}</span>
                <IconButton className="list__map">
                  <LocationOnOutlined />
                </IconButton>
              </div>
              <div className="list__extra">
                Produtividade do último dia:
                <span>
                  {lastUpdateOperatingHours(
                    item.lastDayUpdateOperatingHours ?? 0
                  ).toFixed(2)}
                  %
                </span>
              </div>
              <div className="list__extra">
                Ganhos totais: <span>{gainPerEquipment(item)}</span>
              </div>
              <div className="list__state">
                <span className="list__stateDetail">
                  Status atualizado em:
                  <span>{formattedDate(item.lastStateHistory.date)}</span>
                </span>
                <span className="list__stateDetail">
                  Posição atualizada em:
                  <span>{formattedDate(item.lastPositionHistory.date)}</span>
                </span>
              </div>
            </div>
          </Grid2>
        ))
      ) : (
        <div className="list__empty">
          <EmptyState />
          <span>Nenhum equipamento encontrado</span>
        </div>
      )}
    </Grid2>
  )
}
