<template>
  <div class="info-equipment">
    <h4 class="info-equipment__title d-flex align-center">
      {{ equipment.name }} - {{ equipment.model }}
    </h4>
    <div class="info-equipment__status" :style="`color: ${getCurrentStatus?.color}`">
      {{ getCurrentStatus?.name }}
    </div>
    <div class="mt-8">
      <v-bottom-sheet class="info-equipment__sheet">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps" text="Ver detalhes" variant="tonal" width="100%" />
        </template>

        <v-card class="info-equipment__card" rounded="xl">
          <template v-slot:title>
            {{ equipment.name }}
          </template>

          <template v-slot:subtitle>
            <v-row>
              <v-col cols="12" class="pb-0">
                {{ equipment.model }} 
              </v-col>
              <v-col cols="12" class="pt-1">
                <v-chip variant="outlined" :color="`${getCurrentStatus?.color}`">
                  {{ getCurrentStatus?.name }}
                </v-chip>
              </v-col>
            </v-row>
          </template>
          <template v-slot:text>
            <v-row>
              <v-col cols="12" md="5" sm="12">
                <h4 class="info-equipment__card--title mb-5">Histórico do equipamento</h4>
                <div class="info-equipment__card--history">
                  <EquipmentHistory
                    v-for="(equipment, index) in getEquipments()"
                    :key="index"
                    :equipment-history="equipment" 
                  />
                </div>
              </v-col>
              <v-col cols="12" md="7" sm="12">
                <h4 class="info-equipment__card--title mb-5">Performance</h4>
                <EquipmentPerformance :equipment-activies="formatActivities()" :equipment-earnings="earnings" />
              </v-col>
            </v-row> 
          </template>
        </v-card>
      </v-bottom-sheet>
    </div>
  </div>
</template>
<script lang="ts">
import type { IEquipmentInfo, IAllEquipmentStates, IEquipamentState, IEquipmentStatusHistory, IEquipmentEarn } from "@/interfaces/IEquipament"
import { EquipmentHistory, EquipmentPerformance } from "#components"
import EquipmentService from "@/services/EquipmentService";

export default {
  name: "InfoEquipment",

  components: {
    EquipmentHistory,
    EquipmentPerformance
  },

  props: {
    equipment :{
      type: Object as () => IEquipmentInfo,
      required: true
    },
    allStatus: {
      type: Array as () => IAllEquipmentStates[],
      required: true
    }
  },

  data() {
    return {
      earnings: [] as IEquipmentEarn[] | undefined
    }
  },

  async mounted() {
    this.earnings = await this.getEarnings()
  },

  methods: {
    /**
     * Formats the equipment status by mapping over the equipment states.
     * 
     * @returns {IEquipmentStatusHistory[]} An array of objects containing the date and status name for each equipment state.
     */
    formatEquipmentStatus(): IEquipmentStatusHistory[] {
      return this.equipment.states.map(state => {
        const status = this.allStatus.find(status => status.id === state.equipmentStateId);
        return {
          date: state.date,
          status: status?.name ?? '',
          color: status?.color ?? ''
        };
      })
    },

    /**
     * Formats the activities by removing the color property from each equipment status history object.
     * 
     * @returns {IEquipmentStatusHistory[]} An array of equipment status history objects without the color property.
     */
    formatActivities(): IEquipmentStatusHistory[] {
      const activities: IEquipmentStatusHistory[] = this.formatEquipmentStatus();

      return activities.map((activity => {
        delete activity.color
       
        return activity
      }));
    },

    /**
     * Retrieves the hourly earnings for the equipment based on its ID.
     * 
     * @returns {Promise<IEquipmentEarn[] | undefined>} A promise that resolves to an array of hourly earnings for the equipment, or undefined if no data is found.
     */
    async getEarnings(): Promise<IEquipmentEarn[] | undefined> {
      const earnings = await EquipmentService.getHourlyEarningById(this.equipment.equipmentId)

      return earnings
    },

    getEquipments(): IEquipmentStatusHistory[] {
      return  this.formatEquipmentStatus().reverse()
    }
   },

  computed: {
    /**
     * Gets the current status of the equipment based on the latest state.
     * 
     * @returns {IAllEquipmentStates | undefined} The current status object or undefined if not found.
     */
    getCurrentStatus(): IAllEquipmentStates  | undefined {
      const equipmentStates: IEquipamentState[] = this.equipment.states;
      const lastState: IEquipamentState = equipmentStates[equipmentStates.length - 1];
      const status: IAllEquipmentStates | undefined = this.allStatus.find((status) => status.id === lastState.equipmentStateId);

      return status;
    }
  }
}
</script>
<style lang="scss" src="./index.scss" scoped /> 