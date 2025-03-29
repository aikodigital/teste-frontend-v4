import type { IEquipment, IEquipmentModel, IEquipmentPositionHistory, IEquipmentStateHistory, IAllEquipmentStates } from "@/interfaces/IEquipament"

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
    const filteredData = data.default.find((item: IEquipmentStateHistory) => item.equipmentId === equipmentId);
    const defaultObj = {
      equipmentId: '',
      states:[],
    }
    return filteredData ?? defaultObj;
  }
}