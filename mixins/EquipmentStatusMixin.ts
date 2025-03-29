import { defineComponent } from "vue";
import type { IAllEquipmentStates } from "~/interfaces/IEquipament";
import EquipmentService from "~/services/EquipmentService";


export default defineComponent({
  data() {
    return {
      AllStatus: [] as IAllEquipmentStates[],
    };
  },

  async mounted () {
    this.AllStatus = await EquipmentService.getAvailableStates()
  },

  computed: {
    getAllStatus(): IAllEquipmentStates[] {
      return this.AllStatus
    }
  }
})