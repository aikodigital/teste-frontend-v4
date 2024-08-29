import { useEffect, useState } from 'react'
import equipment from '../data/equipment.json'
import equipmentModel from '../data/equipmentModel.json'
import equipmentPositionHistory from '../data/equipmentPositionHistory.json'
import equipmentState from '../data/equipmentState.json'
import equipmentStateHistory from '../data/equipmentStateHistory.json'

function findClosestState(states, lastPositionDate) {
  return states.reduce((closest, state) => {
    const stateDate = new Date(state.date)
    if (stateDate <= lastPositionDate && (!closest || stateDate > new Date(closest.date))) {
      return state
    }
    return closest
  }, null)
}

function findEquipmentState(stateId) {
  return equipmentState.find(({ id }) => id === stateId)
}

function findEquipmentDetail(equipmentId) {
  return equipment.find(({ id }) => id === equipmentId)
}

function findEquipmentModelDetail(equipmentModelId) {
  return equipmentModel.find(({ id }) => id === equipmentModelId)
}

function getEquipmentStateHistory(equipmentId) {
  return equipmentStateHistory.find((history) => history.equipmentId === equipmentId)
}

function getLastPositionAndState(equipmentId, lastPosition) {
  const history = getEquipmentStateHistory(equipmentId)
  if (!history) return null

  const closestState = findClosestState(history.states, new Date(lastPosition.date))
  const lastEquipmentState = closestState ? findEquipmentState(closestState.equipmentStateId) : null

  return { lastPosition, state: lastEquipmentState }
}

export function useEquipmentInfo() {
  const [info, setInfo] = useState([])

  const [statusFilter, setStatusFilter] = useState('')
  const [modelFilter, setModelFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')

  useEffect(() => {
    function getEquipmentInfo() {
      const lastPositionInfo = equipmentPositionHistory.map(({ equipmentId, positions }) => ({
        equipmentId,
        lastPosition: positions[positions.length - 1],
      }))

      let filteredInfo = lastPositionInfo.map(({ equipmentId, lastPosition }) => {
        const { lastPosition: position, state } = getLastPositionAndState(equipmentId, lastPosition)
        const equipmentDetail = findEquipmentDetail(equipmentId)
        const equipmentModelDetail = equipmentDetail
          ? findEquipmentModelDetail(equipmentDetail.equipmentModelId)
          : null

        return {
          equipmentId,
          lastPosition: position,
          state,
          equipmentName: equipmentDetail?.name,
          equipmentModel: equipmentModelDetail,
        }
      })

      if (statusFilter) {
        filteredInfo = filteredInfo.filter((item) => item.state?.name === statusFilter)
      }

      if (modelFilter) {
        filteredInfo = filteredInfo.filter((item) => item.equipmentModel?.name === modelFilter)
      }

      if (dateFilter) {
        const filterDate = new Date(dateFilter).toISOString().split('T')[0]
        filteredInfo = filteredInfo.filter((item) => {
          const positionDate = new Date(item.lastPosition.date).toISOString().split('T')[0]
          return positionDate === filterDate
        })
      }

      setInfo(filteredInfo)
    }

    getEquipmentInfo()
  }, [statusFilter, modelFilter, dateFilter])

  return {
    info,
    setStatusFilter,
    setModelFilter,
    setDateFilter,
  }
}
