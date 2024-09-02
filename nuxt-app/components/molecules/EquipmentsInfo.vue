<template>
  <div class="main-content-equipments" @click="() => openDialog(equipment)">
    <div class="content-title">
      <div class="left-title">
        <div
          class="info-color"
          :style="`background-color: ${equipment.color}`"
        />
        <span class="span-title"
          >{{ equipment.name }} - {{ equipment.model.name }}</span
        >
      </div>
      <div>
        <Chip
          :text-content="equipment.mostRecentlyState.stateReference?.name"
          :color="equipment.mostRecentlyState.stateReference?.color"
        />
      </div>
    </div>

    <div class="content-footer">
      <div class="content-info">
        <div class="separate-grid-one">
          <span class="info-values-calculated span-info"
            >Total de horas: {{ calculatedValues.totalHours }}
          </span>
          <span class="info-values-calculated span-info"
            >Total de horas operando: {{ calculatedValues.operatingHours }}
          </span>
          <span class="info-values-calculated span-info"
            >Produtividade: {{ calculatedValues.productivity }}%
          </span>
        </div>
        <div class="separate-grid-two">
          <span class="info-values-calculated span-info"
            >Valor gerado:
            {{
              calculateEarnings(
                calculatedValues.operatingHours,
                calculatedValues.maintenanceHours,
                equipment.model.hourlyEarnings,
              )
            }}
          </span>
          <span class="info-values-calculated span-info"
            >Ultima atualização:
            {{ formatDateTime(equipment.mostRecentlyPosition.date) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { useEventBus } from '@/utils/eventBus.ts';
import type {
  IEquipmentNormalized,
  IHourEarnings,
  IStatesHistory,
} from '~/interfaces/equipments.interface';
import { formatDateTime } from '@/utils/date-formatter.ts';

const { emit } = useEventBus();

const props = defineProps<{
  equipment: IEquipmentNormalized;
}>();

const { equipment } = props;

const calculatedValues = computed(() => {
  const states = equipment.stateHistory.states;

  const OPERATING_STATE_ID = '0808344c-454b-4c36-89e8-d7687e692d57';
  const MAINTENANCE_STATE_ID = '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f';
  const STOPPED_STATE_ID = 'baff9783-84e8-4e01-874b-6fd743b875ad';

  let operatingTime = 0;
  let maintenanceTime = 0;
  let stoppedTime = 0;
  let totalTime = 0;
  let lastState: IStatesHistory | null = null;

  states.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  for (let i = 0; i < states.length; i++) {
    const currentState = states[i];

    if (lastState) {
      const startTime = new Date(lastState.date);
      const endTime = new Date(currentState.date);
      const timeDifference =
        (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

      if (lastState.equipmentStateId === OPERATING_STATE_ID) {
        operatingTime += timeDifference;
      } else if (lastState.equipmentStateId === MAINTENANCE_STATE_ID) {
        maintenanceTime += timeDifference;
      } else if (lastState.equipmentStateId === STOPPED_STATE_ID) {
        stoppedTime += timeDifference;
      }

      totalTime += timeDifference;
    }

    lastState = currentState;
  }

  if (lastState) {
    const startTime = new Date(lastState.date);
    const endTime = new Date(startTime);
    endTime.setHours(24, 0, 0, 0);
    const timeDifference =
      (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

    totalTime += timeDifference;

    if (lastState.equipmentStateId === OPERATING_STATE_ID) {
      operatingTime += timeDifference;
    } else if (lastState.equipmentStateId === MAINTENANCE_STATE_ID) {
      maintenanceTime += timeDifference;
    } else if (lastState.equipmentStateId === STOPPED_STATE_ID) {
      stoppedTime += timeDifference;
    }
  }

  const productivity = (operatingTime / totalTime) * 100;

  return {
    totalHours: totalTime,
    operatingHours: operatingTime,
    maintenanceHours: maintenanceTime,
    stoppedHours: stoppedTime,
    productivity: productivity.toFixed(2),
  };
});

function calculateEarnings(
  operatingHours: number,
  maintenanceHours: number,
  hourlyEarnings: IHourEarnings[],
): string {
  const operatingEarning =
    hourlyEarnings.find(
      (earning) =>
        earning.equipmentStateId === '0808344c-454b-4c36-89e8-d7687e692d57',
    )?.value ?? 0;

  const maintenanceEarning =
    hourlyEarnings.find(
      (earning) =>
        earning.equipmentStateId === '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f',
    )?.value ?? 0;

  const earnings =
    operatingHours * operatingEarning + maintenanceHours * maintenanceEarning;

  return formatToCurrency(Number(earnings));
}

function formatToCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function openDialog(equipment: IEquipmentNormalized) {
  emit('openDialog', equipment);
}
</script>

<style>
.content-footer {
  display: flex;
  justify-content: end;
  flex-grow: 1;
  align-items: end;
  flex-wrap: wrap;
  font-size: 0.9em;
}

.content-title {
  display: flex;
  gap: 3px;
  justify-content: space-between;
}

.main-content-equipments {
  box-shadow:
    rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  height: 105px;
  border-radius: 3px;
  padding: 8px;
  position: relative;
  transition: 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.info-color {
  padding: 10px;
  margin: 2px;
  border-radius: 5px;
  height: 20px;
  margin-right: 5px;
  box-shadow: 1px 1px 0px 0px #636363;
}

.span-title {
  font-weight: 500;
}

.main-content-equipments:hover {
  transform: scale(1.01);
  cursor: pointer;
}

.span-info {
  font-weight: 400;
  font-size: 0.85em;
  font-style: italic;
  font-weight: 500;
}

.left-title {
  display: flex;
}

.info-values-calculated {
  width: 100%;
}

.content-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;

  div {
    display: flex;
    flex-flow: column;
    align-items: end;
    justify-content: end;
  }
}

.separate-grid-one {
  text-align: start;
}

.separate-grid-two {
  text-align: end;
}

@media (max-width: 425px) {
  .main-content-equipments {
    height: 140px;
  }
}
</style>
