# EquipmentHistoryModal.vue Documentation

## Overview

The `EquipmentHistoryModal.vue` component is a modal dialog that displays detailed historical information about a specific piece of equipment. It provides insights into the equipment's state history, current state, productivity, and earnings since the equipment's operation started. This component is typically triggered by interacting with an equipment marker on a map.

## Features

- Displays detailed information about the selected equipment, including:
  - Equipment name and current state.
  - Productivity percentage based on historical data.
  - Earnings generated since the equipment began operation.
- Shows a table of the equipment's state history, including dates and state transitions.
- Provides a close button to hide the modal.

## Dependencies

- Vuetify for UI components (`v-dialog`, `v-card`, `v-btn`, `v-data-table`, `v-chip`).
- Vue.js Composition API (`ref`, `computed`, `defineEmits`) for managing component state.
- Vue Store (`useEquipmentStore`) for fetching and managing equipment data.

## Template Structure

```vue
<template>
  <v-dialog v-model:visible="visible" max-width="600">
    <v-card>
      <div class="title-container">
        <div>
          <v-card-title>{{ equipmentDetails?.name }}</v-card-title>
          <v-card-subtitle>{{ equipmentDetails?.currentState?.name }} </v-card-subtitle>
          <v-card-subtitle>
            {{ `${calculateProductivity(equipmentDetails?.stateHistory ?? [])}% de Produtividade` }}
          </v-card-subtitle>
          <v-card-subtitle>
            Ganho Desde Início:
            {{ calculateEarnings(equipmentDetails?.stateHistory ?? [], equipmentModel ?? {}) }}
          </v-card-subtitle>
        </div>
        <v-btn @click="closeModel" class="close-button" width="32" variant="text">
          <img width="32" src="../assets/imgs/close.png" />
        </v-btn>
      </div>
      <v-card-text>
        <h4 class="mb-2">Histórico de Estados</h4>
        <v-data-table
          density="compact"
          items-per-page="5"
          :items="equipmentDetails?.stateHistory"
          :sort-by="[{ key: 'date', order: 'desc' }]"
          hide-default-header
          :items-per-page-options="[5, 10, 15]"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ new Date(item.date).toLocaleString() }}</td>
              <td>
                <v-chip
                  :color="item.stateColor"
                  :text="item.stateName"
                  class="text-uppercase"
                  size="small"
                  label
                  variant="text"
                ></v-chip>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
```

### Elements

- **`v-dialog`**: The main container for the modal. It displays the equipment details and state history.
- **`v-card`**: A Vuetify card component used for structuring the modal content.
- **`v-card-title`**: Displays the equipment name.
- **`v-card-subtitle`**: Shows the current state of the equipment, productivity percentage, and earnings.
- **`v-data-table`**: Displays the equipment’s state history in a paginated table format.
- **`v-btn`**: Close button for dismissing the modal.

## Script

### Props

- **`equipmentId`**: The ID of the equipment whose details are being displayed.
- **`equipmentModelId`**: The ID of the equipment model.

### Emits

- **`updateVisible`**: Emits the visibility status of the modal to the parent component.

### Reactive Variables

- **`visible`**: Controls the visibility of the modal.
- **`equipmentDetails`**: A computed property that retrieves equipment details from the store based on the provided `equipmentId`.
- **`equipmentModel`**: A computed property that retrieves the equipment model's data from the store based on the provided `equipmentModelId`.

### Methods

#### `calculateProductivity(data: EquipmentState[]): string`

- Calculates the percentage of time the equipment was in operation (`operando` state) relative to its total existence time.
- Loops through the state history to compute the time differences for the "operando" states and calculates the overall productivity.

#### `calculateEarnings(equipmentStates: EquipmentState[], hourlyRates: HourlyRates): number`

- Calculates the total earnings based on the equipment's state history and the associated hourly rates for each state.
- Loops through the states and computes the earnings by multiplying the time spent in each state by its corresponding hourly rate.

#### `closeModel()`

- Hides the modal and emits the `updateVisible` event to inform the parent component that the modal is closed.

### Example State Data Structure

```ts
interface EquipmentState {
  date: string
  stateName: string
  stateColor: string
}
```

### Computed Properties

#### `equipmentDetails`

- Fetches the detailed data of the equipment, including its state history, name, and current state, from the store based on the provided `equipmentId`.

#### `equipmentModel`

- Fetches the model data of the equipment, including information needed for calculating earnings, based on the provided `equipmentModelId`.

## Key Components and Functionality

### `v-dialog`

- A Vuetify dialog component that acts as the modal window.
- It is controlled by the `visible` reactive property and displays the equipment details and history.

### `v-data-table`

- Displays the historical states of the equipment in a tabular format.
- The table is sortable by date and paginated with options to display 5, 10, or 15 items per page.

### `v-chip`

- Used within the data table to display the state name with a corresponding color, making it easy to identify the equipment's state at any given time.

## Usage Example

Here’s an example of how `EquipmentHistoryModal.vue` might be integrated into another component, such as a map component where clicking on a marker opens the modal:

```vue
<template>
  <EquipmentMap />
  <EquipmentHistoryModal
    v-model:visible="isModalVisible"
    :equipmentId="selectedEquipmentId"
    :equipmentModelId="selectedEquipmentModelId"
  />
</template>

<script setup lang="ts">
import EquipmentMap from '@/components/EquipmentMap.vue'
import EquipmentHistoryModal from '@/components/EquipmentHistoryModal.vue'
import { ref } from 'vue'

const isModalVisible = ref(false)
const selectedEquipmentId = ref(null)
const selectedEquipmentModelId = ref(null)
</script>
```
