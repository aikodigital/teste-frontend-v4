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
              <v-col cols="12" md="4" sm="12">
                <h4 class="info-equipment__card--title mb-5">Histórico do equipamento</h4>
                <div class="info-equipment__card--history">
                  <EquipmentHistory
                    v-for="(equipment, index) in formatEquipmentStatus()"
                    :key="index"
                    :equipment-history="equipment" 
                  />
                </div>
              </v-col>
              <v-col cols="12" md="8" sm="12">
                Performance TODO
                <v-progress-circular
                  :model-value="'59'"
                  :rotate="150"
                  :size="80"
                  :width="11"
                >
                  59
                </v-progress-circular>
              </v-col>
            </v-row>
          </template>
        </v-card>
      </v-bottom-sheet>
    </div>
  </div>
</template>
<script lang="ts">
import type { IEquipmentInfo, IAllEquipmentStates, IEquipamentState, IEquipmentStatusHistory } from "@/interfaces/IEquipament"

export default {
  name: "InfoEquipment",

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

  methods: {
    /**
     * Formats the equipment status by mapping over the equipment states.
     * 
     * @returns {IEquipmentStatusHistory[]} An array of objects containing the date and status name for each equipment state.
     */
    formatEquipmentStatus(): IEquipmentStatusHistory[] {
      return this.equipment.states.map(state => {
        const status = this.allStatus.find(status => status.id === state.equipmentStateId)
        return {
          date: state.date,
          status: status?.name ?? '',
          color: status?.color ?? ''
        }
      })
    },
   },

  computed: {
    /**
     * Gets the current status of the equipment based on the latest state.
     * 
     * @returns {IAllEquipmentStates | undefined} The current status object or undefined if not found.
     */
    getCurrentStatus(): IAllEquipmentStates  | undefined {
      const equipmentStates: IEquipamentState[] = this.equipment.states
      const lastState: IEquipamentState = equipmentStates[equipmentStates.length - 1]
      const status: IAllEquipmentStates | undefined = this.allStatus.find((status) => status.id === lastState.equipmentStateId)

      return status
    }
  }
}
</script>
<style lang="scss" src="./index.scss" scoped /> 