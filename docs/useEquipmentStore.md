# `useEquipmentStore.ts` Documentation

The `useEquipmentStore.ts` file defines a Pinia store for managing equipment-related data. It includes equipment information, state history, position history, and model data, with several getters to retrieve and combine these details. Below is a detailed explanation of each part of the store.

## Interfaces

1. **Position**

   - Represents geographical coordinates with `lat` (latitude) and `lon` (longitude).

2. **Equipment**

   - Represents a piece of equipment with `id`, optional `name`, and `equipmentModelId`.

3. **EquipmentState**

   - Represents a state of the equipment, including `id`, `name`, and a `color` to visually represent the state.

4. **EquipmentStateHistory**

   - Tracks the history of states for an equipment with `equipmentId` and an array of state transitions (with `equipmentStateId` and `date`).

5. **EquipmentPositionHistory**

   - Tracks the positional history of equipment with `equipmentId` and an array of positions (`lat`, `lon`).

6. **HourlyEarning**

   - Associates an equipment state (`equipmentStateId`) with an hourly earning value.

7. **EquipmentModel**
   - Represents the equipment model with `id`, `name`, and an array of `hourlyEarnings`.

## State Variables

1. **`equipmentData`**

   - Stores the list of all available equipment.
   - Type: `Equipment[]`

2. **`equipmentStates`**

   - Stores the list of all equipment states.
   - Type: `EquipmentState[]`

3. **`equipmentStateHistory`**

   - Stores the historical state transitions for equipment.
   - Type: `EquipmentStateHistory[]`

4. **`equipmentPositionHistory`**

   - Stores the positional history of equipment.
   - Type: `EquipmentPositionHistory[]`

5. **`equipmentModels`**
   - Stores the list of equipment models.
   - Type: `EquipmentModel[]`

## Actions (Data Fetching)

1. **`fetchEquipmentModelsData`**

   - Fetches equipment model data from `/data/equipmentModel.json` and updates `equipmentModels`.

2. **`fetchEquipmentData`**

   - Fetches equipment data from `/data/equipment.json` and updates `equipmentData`.

3. **`fetchEquipmentStates`**

   - Fetches equipment state data from `/data/equipmentState.json` and updates `equipmentStates`.

4. **`fetchEquipmentStateHistory`**

   - Fetches the state history of equipment from `/data/equipmentStateHistory.json` and updates `equipmentStateHistory`.

5. **`fetchEquipmentPositionHistory`**
   - Fetches the position history of equipment from `/data/equipmentPositionHistory.json` and updates `equipmentPositionHistory`.

## Getters (Computed Data)

1. **`getLatestEquipmentStateById(equipmentId: string)`**

   - Retrieves the latest state of an equipment by its `equipmentId`.
   - Combines state data with the state history to return the latest state and its date.
   - Returns an object containing the latest state details (`name`, `color`) and date, or `null` if no data is found.

2. **`getEquipmentStateHistoryById(equipmentId: string)`**

   - Retrieves the entire state history of an equipment by its `equipmentId`.
   - Returns an array of state transitions with `equipmentStateId` and `date`.

3. **`getLatestPositionById(equipmentId: string)`**

   - Retrieves the latest position of an equipment by its `equipmentId`.
   - Returns the latest `Position` (with `lat` and `lon`) or `null` if no positions are found.

4. **`getEquipmentModelData(equipmentModelId: string)`**

   - Retrieves the model data for a specific `equipmentModelId` and calculates hourly earnings for various states.
   - Maps state IDs to predefined state names (e.g., "Operando", "Parado", "Manutenção") and returns an object with hourly earnings for each state.
   - Ensures all possible states have an earning value, defaulting to `0` if not present.

5. **`getEquipmentDetails(equipmentId: string)`**
   - Retrieves detailed information about a specific piece of equipment, including:
     - Basic equipment info (e.g., `id`, `name`, `equipmentModelId`)
     - The latest state and its associated details (e.g., name, color)
     - The latest position (if available)
     - The full state history with state names and colors.
   - Returns an object combining equipment data, state history, and position data.

## Example Usage

```ts
import { useEquipmentStore } from '@/stores/useEquipmentStore'

// Initialize the store
const equipmentStore = useEquipmentStore()

// Fetch equipment data
await equipmentStore.fetchEquipmentData()

// Get details of a specific equipment
const equipmentDetails = equipmentStore.getEquipmentDetails('equipment-id')

// Get latest state of equipment by ID
const latestState = equipmentStore.getLatestEquipmentStateById('equipment-id')

// Get equipment's state history
const stateHistory = equipmentStore.getEquipmentStateHistoryById('equipment-id')

// Get latest position of equipment by ID
const latestPosition = equipmentStore.getLatestPositionById('equipment-id')
```

This Pinia store centralizes the management of equipment-related data, providing efficient ways to fetch, combine, and display equipment, state, and positional information in the application.
