import type { IEquipment } from "@/interfaces/IEquipament"
import EquipmentService from "~/services/EquipmentService"
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      equipments: [] as IEquipment[],
    };
  },

  async mounted () {
    this.equipments = await EquipmentService.getEquipaments()
  },

  methods: {
    getEquipmentName(equipmentId: string): string {
      const equipment = this.equipments.find(e => e.id === equipmentId);
      return equipment?.name ?? '';
    },
  },
});
