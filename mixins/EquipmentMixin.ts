import type { IAllEquipmentStates, IEquipment, IEquipmentInfo, IEquipmentModel, IEquipmentStateHistory } from "@/interfaces/IEquipament"
import EquipmentService from "@/services/EquipmentService"
import { defineComponent } from "vue";
import { EquipmentTypes, Icons } from "@/enums/Icons";

export default defineComponent({
  data() {
    return {
      equipments: [] as IEquipment[],
      equipmentModels: [] as IEquipmentModel[],
      allStatus: [] as IAllEquipmentStates[],
    };
  },

  async mounted () {
    this.equipments = await EquipmentService.getEquipaments()
    this.equipmentModels = await EquipmentService.getEquipmentModels()
    this.allStatus = await EquipmentService.getAvailableStates()
  },

  methods: {
    /**
     * Retrieves the name of an equipment by its ID.
     * 
     * This method searches for an equipment in the `getEquipment()`providing `equipmentId`.
     * If a matching equipment is found, its name is returned. If no matching equipment is found,
     * an empty string is returned.
     * 
     * @param {string} equipmentId
     * @returns {string}
     */
    getEquipmentName(equipmentId: string): string {
      const equipment = this.getEquipment(equipmentId);

      return equipment?.name ?? '';
    },

    /**
     * Retrieves an equipment by its ID.
     * 
     * This method searches for an equipment in the `equipments` array using the provided `equipmentId`.
     * 
     * @param {string} equipmentId
     * @returns {string|undefined}
     */
    getEquipment(equipmentId: string):IEquipment | undefined  {
      return this.equipments.find(equipment => equipment.id === equipmentId);
    },

    getEquipmentModel(equipment: IEquipment | undefined): IEquipmentModel | undefined {
      return this.equipmentModels.find(model => model.id === equipment?.equipmentModelId)
    },

    /**
     * Retrieves the marker icon for the given equipment based on its equipment type.
     * 
     * This function uses the equipment ID to find the equipment and its associated equipment model,
     * and then determines the type of equipment (e.g., HARVEST, RAKE, TRUCK). Based on the equipment
     * type, it returns the corresponding icon from the `Icons` object.
     *
     * @param {string} equipmentId - The ID of the equipment for which the marker icon is required.
     * @returns {string} - The corresponding icon for the equipment type.
     */
    getMarkerIcon(equipmentId: string): string {
      const equipment = this.getEquipment(equipmentId);
      const equipmentModel = this.getEquipmentModel(equipment)
      const equipmentType = equipmentModel?.name?.split(' ')?.[0]

      switch (equipmentType) {
        case EquipmentTypes.HARVEST:
          return Icons.HARVEST
        case EquipmentTypes.RAKE:
          return Icons.RAKE
        default:
          return Icons.TRUCK
      }
    },

    async formatSelectedEquipment(equipmentId: string): Promise<IEquipmentInfo> {
      const equipment = this.getEquipment(equipmentId)
      const equipmentModel = this.getEquipmentModel(equipment)
      const equipmentHistory = await EquipmentService.getEquipmentStates(equipmentId)

      return {
        ...equipmentHistory,
        name: equipment?.name ?? '',
        model: equipmentModel?.name ?? ''
      }
    },
  },
});
