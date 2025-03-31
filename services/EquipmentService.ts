import type { IEquipment, IEquipmentModel, IEquipmentPositionHistory, IEquipmentStateHistory, IAllEquipmentStates, IEquipmentEarn } from "@/interfaces/IEquipament"

/**
 * Service responsible for fetching equipment-related data.
 */
export default class EquipmentService {
  /**
   * Retrieves a list of all equipment.
   * @returns {Promise<IEquipment[]>}
   */
  static async getEquipaments(): Promise<IEquipment[]> {
    const data = await import("@/data/equipment.json")

    return data.default
  }

  /**
   * Retrieves all available equipment models.
   * @returns {Promise<IEquipmentModel[]>}
   */
  static async getEquipmentModels(): Promise<IEquipmentModel[]> {
    const data = await import("@/data/equipmentModel.json")

    return data.default
  }

  /**
   * Retrieves the history positions of all equipment.
   * @returns {Promise<IEquipmentPositionHistory[]>}
   */
  static async getEquipmentPositions(): Promise<IEquipmentPositionHistory[]> {
    const data = await import("@/data/equipmentPositionHistory.json");

    const formattedResponse = data.default.map(equipment => {
      const positions =  equipment.positions
      const lastPosition = positions[positions.length - 1]
      return {
        ...equipment,
        lastPosition
      }
    })

    return formattedResponse
  }

  /**
   * Retrieves all available equipment states.
   * @returns {Promise<IAllEquipmentStates[]>}
   */
  static async getAvailableStates(): Promise<IAllEquipmentStates[]> {
    const data = await import("@/data/equipmentState.json");

    return  data.default
  }

   /**
   * Retrieves the historical states of equipment.
   * @returns {Promise<IEquipmentStateHistory[]>}
   */
  static async getEquipmentStates(equipmentId: string): Promise<IEquipmentStateHistory> {
    const data = await import("@/data/equipmentStateHistory.json");
    const filteredData = data.default.find((equipment: IEquipmentStateHistory) => equipment.equipmentId === equipmentId);
    const defaultObj = {
      equipmentId: '',
      states:[],
    }
    return filteredData ?? defaultObj;
  }

  /**
   * Retrieves the hourly earnings for a specific equipment by its ID.
   * 
   * @param {string} equipmentId - The ID of the equipment for which to retrieve hourly earnings.
   * @returns {Promise<IEquipmentEarn[] | undefined>} A promise that resolves to an array of hourly earnings for the specified equipment, or undefined if no data is found.
   */
  static async getHourlyEarningById(equipmentId: string): Promise<IEquipmentEarn[] | undefined> {
    const equipment = await EquipmentService.getEquipaments()
    const equipmentModel = await EquipmentService.getEquipmentModels();
    const states = await EquipmentService.getAvailableStates()

    const currentEquipment = equipment.find(equipment => equipment.id === equipmentId);
    const currentModel = equipmentModel.find(model => model.id === currentEquipment?.equipmentModelId)

    return currentModel?.hourlyEarnings.map(item => {
      const currentState = states.find(state => state.id === item.equipmentStateId)
      return {
        ...item,
        stateLabel: currentState?.name ?? ''
      }
    })
  }
}