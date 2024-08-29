import harvesterIcon from '../assets/icons/harvester.svg'
import cargoTruckIcon from '../assets/icons/cargo-truck.svg'
import skidderIcon from '../assets/icons/skidder.svg'

export const EQUIPMENT_NAMES = {
  CAMINHAO_CARGA: 'Caminhão de carga',
  HARVESTER: 'Harvester',
  GARRA_TRACADORA: 'Garra traçadora',
}

export const EQUIPMENT_ICONS = {
  CAMINHAO_CARGA: cargoTruckIcon,
  HARVESTER: harvesterIcon,
  GARRA_TRACADORA: skidderIcon,
}

export const EquipmentModelIconMap = {
  [EQUIPMENT_NAMES.CAMINHAO_CARGA]: EQUIPMENT_ICONS.CAMINHAO_CARGA,
  [EQUIPMENT_NAMES.HARVESTER]: EQUIPMENT_ICONS.HARVESTER,
  [EQUIPMENT_NAMES.GARRA_TRACADORA]: EQUIPMENT_ICONS.GARRA_TRACADORA,
}
