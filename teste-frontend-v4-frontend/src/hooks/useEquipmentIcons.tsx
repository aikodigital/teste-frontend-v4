import { EQUIPMENT_STATUS } from '@constants/states'
import { EQUIPMENT_MODELS } from '@constants/models'

import { IEquipmentModel } from '@interfaces/equipmentModel.interface'
import { IEquipmentState } from '@interfaces/equipmentState.interface'

import {
  ToolMaintainingIcon,
  ToolStoppedIcon,
  ToolWorkingIcon,
  TreeMaintainingIcon,
  TreeStoppedIcon,
  TreeWorkingIcon,
  TruckMaintainingIcon,
  TruckStoppedIcon,
  TruckWorkingIcon
} from './Icons'

const useEquipmentIcons = (state: IEquipmentState, model: IEquipmentModel) => {
  let EquipmentIcon = TreeStoppedIcon

  switch (model.id) {
    case EQUIPMENT_MODELS.TREE:
      switch (state.id) {
        case EQUIPMENT_STATUS.MAINTAINING:
          EquipmentIcon = TreeMaintainingIcon
          break
        case EQUIPMENT_STATUS.STOPPED:
          EquipmentIcon = TreeStoppedIcon
          break
        case EQUIPMENT_STATUS.WORKING:
          EquipmentIcon = TreeWorkingIcon
          break
      }
      break
    case EQUIPMENT_MODELS.TOOL:
      switch (state.id) {
        case EQUIPMENT_STATUS.MAINTAINING:
          EquipmentIcon = ToolMaintainingIcon
          break
        case EQUIPMENT_STATUS.STOPPED:
          EquipmentIcon = ToolStoppedIcon
          break
        case EQUIPMENT_STATUS.WORKING:
          EquipmentIcon = ToolWorkingIcon
          break
      }
      break
    case EQUIPMENT_MODELS.TRUCK:
      switch (state.id) {
        case EQUIPMENT_STATUS.MAINTAINING:
          EquipmentIcon = TruckMaintainingIcon
          break
        case EQUIPMENT_STATUS.STOPPED:
          EquipmentIcon = TruckStoppedIcon
          break
        case EQUIPMENT_STATUS.WORKING:
          EquipmentIcon = TruckWorkingIcon
          break
      }
      break
  }

  return {
    EquipmentIcon
  }
}

export default useEquipmentIcons
