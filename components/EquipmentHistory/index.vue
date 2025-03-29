<template>
  <div>
    <v-card class="mx-auto mb-2 equipment-history" border flat>
    <v-list-item class="px-6" height="88">
      <template v-slot:prepend>
        <v-avatar color="surface-light" size="32">
          <v-icon icon="mdi-calendar-month-outline" size="16" />
        </v-avatar>
        <span></span>
      </template>

      <template v-slot:title> 
        
        <h6 class="equipment-history__title">{{ formatDate(equipmentHistory.date) }}</h6>
      </template>

      <template v-slot:append>
        <v-chip variant="outlined" :color="`${equipmentHistory.color}`">
          {{ equipmentHistory.status }}
        </v-chip>
      </template>
    </v-list-item>

  </v-card>
  </div>
</template>
<script lang="ts">
import formatDate from '@/utils/formatDate'
import type { IEquipmentStatusHistory } from "@/interfaces/IEquipament"

export default {
  name: 'EquipmentHistory',

  props: {
    equipmentHistory: {
      type: Object as () => IEquipmentStatusHistory,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.equipment-history {
  &__title {
    font-size: $font-medium;
    font-weight: 500;
    text-wrap: auto;
  }
}
</style>