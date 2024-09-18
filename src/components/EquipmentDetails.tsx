import { useEffect, useState } from 'react'
import equipmentData from '../data/equipment.json'
import equipmentModel from '../data/equipmentModel.json'
import equipmentStateData from '../data/equipmentState.json'
import { getStateDetailsById } from '../utils/equipmentUtils'
import type {
  EquipmentState,
  EquipmentModel,
  EquipmentDetailsProps,
} from '../types/Equipment'

const EquipmentDetails = ({ equipmentId }: EquipmentDetailsProps) => {
  const [equipmentModelDetails, setEquipmentModelDetails] =
    useState<EquipmentModel | null>(null)
  const [states, setStates] = useState<EquipmentState[]>([])

  useEffect(() => {
    const selectedEquipment = equipmentData.find((eq) => eq.id === equipmentId)

    if (!selectedEquipment) {
      setEquipmentModelDetails(null)
      return
    }

    const selectedModel = equipmentModel.find(
      (model) => model.id === selectedEquipment.equipmentModelId
    )

    if (!selectedModel) {
      setEquipmentModelDetails(null)
      return
    }

    setEquipmentModelDetails(selectedModel)

    setStates(equipmentStateData)
  }, [equipmentId])

  if (!equipmentModelDetails) {
    return <p>Equipamento não encontrado</p>
  }

  return (
    <div className="equipment-details">
      <h2 className="text-black text-lg font-medium mb-4">
        {equipmentModelDetails.name}
      </h2>
      <ul>
        {equipmentModelDetails.hourlyEarnings.map((earning) => {
          const stateDetails = getStateDetailsById(
            states,
            earning.equipmentStateId
          )

          if (!stateDetails) {
            return (
              <li
                key={earning.equipmentStateId}
                className="flex items-center mb-2"
              >
                <span
                  className="mr-2 block w-4 h-4"
                  style={{ backgroundColor: 'gray' }}
                />
                <span>Estado desconhecido: </span>
                <span className="ml-2">R$0/h</span>
              </li>
            )
          }
          return (
            <li
              key={earning.equipmentStateId}
              className="flex items-center mb-2"
            >
              <span
                className="mr-2 block w-4 h-4"
                style={{ backgroundColor: stateDetails.color }}
              />
              <span className="text-black text-lg font-medium">
                {stateDetails.name}:{' '}
              </span>
              <span
                className={`ml-2 text-lg font-medium ${earning.value >= 0 ? 'text-green-500' : 'text-red-500'}`}
              >
                {earning.value >= 0
                  ? `+R$${earning.value}/h`
                  : `-R$${Math.abs(earning.value)}/h`}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default EquipmentDetails
