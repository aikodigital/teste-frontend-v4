import EquipmentService from '~/services/services'

export default function useServices() {
  return {
    equipments: EquipmentService(),
  }
}
