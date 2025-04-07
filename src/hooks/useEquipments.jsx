import { useMemo } from "react"
import equipments from "../data/equipment.json"
import equipmentPositionHistory from "../data/equipmentPositionHistory.json"
import equipmentStateHistory from "../data/equipmentStateHistory.json"
import equipmentModel from "../data/equipmentModel.json"
import equipmentState from "../data/equipmentState.json"

const useEquipments = () => {
  // Retornando a data mais recente para cada "equipmentId"
  const reducedEquipmentHistory = useMemo(() => {
    return equipmentPositionHistory.map((equip) => {
      const dataMaisRecente = equip.positions.reduce((a, b) =>
        new Date(a.date) > new Date(b.date) ? a : b
      )

      return {
        equipmentId: equip.equipmentId,
        positions: dataMaisRecente,
      }
    })
  }, [])

  // Encontrando os equipamentos por id
  const equipmentsToShow = useMemo(() => {
    return equipments.map((equipment) => {
      const equipmentLocation = reducedEquipmentHistory.find(
        (e) => e.equipmentId === equipment.id
      )

      return {
        id: equipment.id,
        equipmentModelId: equipment.equipmentModelId,
        name: equipment.name,
        positions: equipmentLocation?.positions ?? null,
      }
    })
  }, [reducedEquipmentHistory])

  // Retornando apenas o estado mais recente para cada "equipmentId"
  const mostRecentEquipmentState = useMemo(() => {
    return equipmentStateHistory.map((equip) => {
      const recentState = equip.states.reduce((a, b) =>
        new Date(a.date) > new Date(b.date) ? a : b
      )

      return {
        equipmentId: equip.equipmentId,
        states: recentState,
      }
    })
  }, [])

  // Consultas derivadas abstraidas do componente
  const getEquipmentDetails = (equip) => {
    const model = equipmentModel.find((e) => e.id === equip.equipmentModelId)

    const selectedEquipment = mostRecentEquipmentState.find(
      (e) => e.equipmentId === equip.id
    )

    const selectedState = equipmentState.find(
      (state) =>
        state.id === selectedEquipment?.states?.equipmentStateId
    )

    const historyState = equipmentStateHistory.filter(
      (state) => state.equipmentId === equip.id
    )

    return {
      model,
      selectedEquipment,
      selectedState,
      historyState,
    }
  }
  
  const getStateByEquipmentStateById = (id) => {
    return equipmentState.find((state) => state.id === id)
  }

  const formatEquipmentDate = (dateStr) => {
    return new Date(dateStr).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return { equipmentsToShow, mostRecentEquipmentState, getEquipmentDetails, getStateByEquipmentStateById, formatEquipmentDate }
}

export default useEquipments
