import { useEffect, useMemo, useState } from 'react'
import { createStateDictionary } from '../utils/createStateDictionary'
import { filterEquipmentHistory } from '../utils/filterEquipmentHistory'
import { updateLocation } from '../utils/updateLocation'
import equipment from '../data/equipment.json'
import equipmentModel from '../data/equipmentModel.json'
import equipmentState from '../data/equipmentState.json'
import equipmentStateHistory from '../data/equipmentStateHistory.json'

function findClosestState(states, referenceDate) {
  return states.reduce((closest, state) => {
    const stateDate = new Date(state.date)
    const isCloser = !closest || stateDate > new Date(closest.date)
    const isAfterReferenceDate = stateDate <= referenceDate
    if (isAfterReferenceDate && isCloser) {
      return state
    }
    return closest
  }, null)
}

function getEquipmentState(equipmentId) {
  return equipmentState.find(({ id }) => id === equipmentId)
}

function getEquipmentDetails(equipmentId) {
  const equipmentDetail = equipment.find(({ id }) => id === equipmentId)
  const modelDetail = equipmentDetail
    ? equipmentModel.find(({ id }) => id === equipmentDetail.equipmentModelId)
    : null
  return { equipmentDetail, modelDetail }
}

function getEquipmentStateHistory(equipmentId) {
  return equipmentStateHistory.find(({ equipmentId: id }) => id === equipmentId)
}

function getLastPositionAndState(equipmentId, lastPosition) {
  const history = getEquipmentStateHistory(equipmentId)
  if (!history) return { lastPosition, state: null }

  const closestState = findClosestState(history.states, new Date(lastPosition.date))
  const state = closestState ? getEquipmentState(closestState.equipmentStateId) : null

  return { lastPosition, state }
}

export function useEquipmentInfo() {
  const [info, setInfo] = useState([])
  const [statusFilter, setStatusFilter] = useState('')
  const [modelFilter, setModelFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [allStateHistory, setAllStateHistory] = useState([])
  const [stateDictionary, setStateDictionary] = useState({})
  const [locations, setLocations] = useState([])
  const [filters] = useState({
    dateStart: '',
    dateEnd: '',
    name: '',
    model: '',
    status: '',
  })

  useEffect(() => {
    setStateDictionary(createStateDictionary())

    const mergedHistory = equipmentStateHistory.flatMap((history) => {
      const { equipmentDetail, modelDetail } = getEquipmentDetails(history.equipmentId)
      return history.states.map((state) => ({
        ...state,
        equipmentId: history.equipmentId,
        equipmentName: equipmentDetail?.name || 'Desconhecido',
        equipmentModelName: modelDetail?.name || 'Desconhecido',
      }))
    })
    setAllStateHistory(mergedHistory)
  }, [])

  const filteredItems = useMemo(() => {
    return filterEquipmentHistory(allStateHistory, filters, stateDictionary)
  }, [allStateHistory, filters, stateDictionary])

  useEffect(() => {
    async function fetchAndUpdateLocations() {
      await updateLocation(filteredItems, setLocations, dateFilter)
    }
    fetchAndUpdateLocations()
  }, [filteredItems, dateFilter])

  useEffect(() => {
    function filterAndSetInfo() {
      const filteredInfo = locations.map(({ equipmentId, positions }) => {
        const { lastPosition, state } = getLastPositionAndState(equipmentId, positions)
        const { equipmentDetail, modelDetail } = getEquipmentDetails(equipmentId)

        return {
          equipmentId,
          lastPosition,
          state,
          equipmentName: equipmentDetail?.name,
          equipmentModel: modelDetail,
        }
      })

      const applyFilters = (items) => {
        if (statusFilter) {
          items = items.filter((item) => item.state?.name === statusFilter)
        }
        if (modelFilter) {
          items = items.filter((item) => item.equipmentModel?.name === modelFilter)
        }
        if (dateFilter) {
          const filterDate = new Date(dateFilter).toISOString().split('T')[0]
          items = items.filter(
            (item) => new Date(item.lastPosition.date).toISOString().split('T')[0] === filterDate,
          )
        }
        return items
      }

      setInfo(applyFilters(filteredInfo))
    }

    filterAndSetInfo()
  }, [statusFilter, modelFilter, dateFilter, locations])

  return {
    info,
    setStatusFilter,
    setModelFilter,
    setDateFilter,
  }
}
