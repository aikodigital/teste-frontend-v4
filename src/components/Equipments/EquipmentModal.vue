<script lang="ts" setup>
import { ref } from 'vue'
import { normalizeIsoDate, normalizeModelName, normalizeStateName } from '@/utils/utils';
import type { IEquipment, IEquipmentModel, IEquipmentPositionHistory, IEquipmentStateDefinition , IEquipmentStateHistory } from '@/types/equipment.types';
import { useLastEquipmentState } from '@/composables/useLastEquipmentState'
import { useEquipmentStateColor } from '@/composables/useEquipmentStateColor'
import { useLastEquipmentPosition } from '@/composables/useLastEquipmentPosition'
import LeafletMap from '../Map/LeafletMap.vue';
import EquipmentStateTable from './EquipmentStateTable.vue';

interface Props {
  equipment: IEquipment | null;
  equipmentsModels: IEquipmentModel[];
  equipmentPositionHistory: IEquipmentPositionHistory[];
  equipmentStateHistory: IEquipmentStateHistory[];
  equipmentStates: IEquipmentStateDefinition [];
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'onClose'): void
}>()

const dialog = ref(true)
const tab = ref<string | null>(null)

const { lastState } = useLastEquipmentState(props.equipmentStateHistory)
const { lastPosition } = useLastEquipmentPosition(props.equipmentPositionHistory)
const { color } = useEquipmentStateColor(lastState?.value?.equipmentStateId || '', props.equipmentStates)

</script>

<template>
  <v-dialog
    v-model="dialog"
    persistent
    transition="dialog-top-transition"
    width="800"
  >
    <template #default="{}">
      <v-card>
        <v-toolbar
          color="primary"
          dark
          :title="props?.equipment?.name"
        >
          <v-btn
            icon="mdi-close"
            @click.prevent="emit('onClose')"
          />
        </v-toolbar>

        <v-tabs
          v-model="tab"
          bg-color="primary"
          color="secondary"
        >
          <v-tab value="one">
            Informações gerais
          </v-tab>
          <v-tab value="two">
            Histórico
          </v-tab>
        </v-tabs>

        <v-card-text class="scrollable-container">
          <v-tabs-window v-model="tab">
            <v-tabs-window-item
              value="one"
            >
              <div class="pb-0 mb-5 d-flex flex-column flex-sm-row">
                <LeafletMap
                  :positions="lastPosition ? lastPosition : { lat: 0, lon: 0 , date: ''}"
                  :state="lastState?.equipmentStateId ? normalizeStateName(lastState.equipmentStateId, props.equipmentStates) : ''"
                  :equipment-model-id="props?.equipment?.equipmentModelId || ''"
                />
                <div>
                  <div class="mx-4 mt-4 mt-sm-0">
                    <h4>
                      Modelo
                    </h4>
                    <p>{{ normalizeModelName(props?.equipment?.equipmentModelId || '', props?.equipmentsModels) }}</p>
                  </div>
                  <div class="mx-4 mt-4">
                    <h4>
                      Última atualização
                    </h4>
                    <p>{{ lastState ? normalizeIsoDate(lastState?.date) : '-' }}</p>
                  </div>
                  <div class="mx-4 mt-4">
                    <h4>
                      Última posição
                    </h4>
                    <p>Latitude: {{ lastPosition?.lat }}</p>
                    <p>Longitude: {{ lastPosition?.lon }}</p>
                  </div>
                  <div class="ma-4">
                    <v-chip :color="color">
                      {{ lastState?.equipmentStateId ? normalizeStateName(lastState.equipmentStateId, props.equipmentStates) : '' }}
                    </v-chip>
                  </div>
                </div>
              </div>
            </v-tabs-window-item>

            <v-tabs-window-item value="two">
              <EquipmentStateTable
                :states="props.equipmentStates"
                :states-history="props.equipmentStateHistory"
              />
            </v-tabs-window-item>
          </v-tabs-window>

          <v-card-actions class="justify-end">
            <v-btn
              variant="tonal"
              color="primary"
              @click="emit('onClose')"
            >
              Fechar
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<style lang="scss" scoped>
.scrollable-container {
  max-height: 720px;
  overflow-y: scroll;
}
  
</style>
