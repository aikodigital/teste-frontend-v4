# EquipmentMap.vue Documentation

## Overview

The `EquipmentMap.vue` component is a Vue.js component responsible for displaying a Leaflet map that contains markers representing various equipment positions. Each marker is associated with real-time data such as the equipment's state and model. Users can interact with the markers to view detailed equipment history using a modal.

## Features

- Displays equipment markers on a map using Leaflet.
- Fetches equipment-related data from the store (e.g., equipment position, state, and model).
- Markers show real-time state information for each piece of equipment.
- Clicking a marker opens an `EquipmentHistoryModal` that displays the equipment’s historical data.
- Markers have popups that display equipment name, state, and the last update time.

## Dependencies

- [Leaflet.js](https://leafletjs.com/) for rendering the map and markers.
- Vue 3 Composition API (`ref`, `onMounted`) for reactive state management.
- Vue Store (`useEquipmentStore`) to fetch and manage equipment data.
- `EquipmentHistoryModal` component to display detailed equipment history.

## Template Structure

```vue
<template>
  <div id="map" class="w-100 h-100"></div>
  <EquipmentHistoryModal
    @updateVisible="handleVisibilityChange"
    :equipmentId="equipmentId"
    :equipmentModelId="equipmentModelId"
    v-model="visible"
  />
</template>
```

### Elements

- **Map Container (`#map`)**: The main container where the Leaflet map is rendered.
- **`EquipmentHistoryModal`**: A modal that is shown when the user clicks on a map marker. It displays the equipment's historical data based on the selected equipment ID and model ID. See **`EquipmentHistoryModal`**'s documentation for more details.

## Script

### Reactive Variables

- **`visible`**: Controls the visibility of the `EquipmentHistoryModal`.
- **`equipmentId`**: Stores the ID of the equipment whose marker was clicked.
- **`equipmentModelId`**: Stores the ID of the equipment model corresponding to the clicked marker.

### Methods and Functions

#### `handleVisibilityChange(newVisible: boolean)`

- Updates the visibility state of the `EquipmentHistoryModal`.

#### `populateMarkers()`

- Fetches equipment data from the store and processes it to generate markers for the map.
- Returns an array of objects containing equipment information, including position, state, name, and model.

#### `initializeMap()`

- Initializes the Leaflet map and sets up the base tile layer.
- Fetches and adds markers to the map using the data returned by `populateMarkers()`.
- Sets map boundaries to include all equipment positions.

#### Marker Event Handlers

- **Click**: Opens the `EquipmentHistoryModal` and passes the selected equipment and model IDs.
- **Mouseover**: Displays a popup with equipment information.
- **Mouseout**: Closes the popup when the mouse leaves the marker.

### Example Marker Data Structure

```ts
{
  id: string
  name: string
  modelId: string
  state: string
  stateDate: string
  color: string
  position: L.LatLngExpression
}
```

### Lifecycle Hook

- **`onMounted`**: The `initializeMap()` function is called when the component is mounted to set up the map and markers.

## Leaflet Integration

The map is powered by Leaflet and uses OpenStreetMap tiles for displaying geographic data. Markers are dynamically created based on equipment positions fetched from the store.

### Key Leaflet Features

- **`L.map('map')`**: Initializes the map in the `#map` element.
- **`L.tileLayer()`**: Adds a tile layer from OpenStreetMap.
- **`L.marker()`**: Creates a marker at each equipment's position.
- **`marker.bindPopup()`**: Attaches a popup to each marker, displaying equipment information.
- **`map.fitBounds()`**: Automatically adjusts the map view to include all markers.

## Props

- **`v-model="visible"`**: Two-way binding to control the visibility of the modal.
- **`:equipmentId`**: Passes the selected equipment's ID to the modal.
- **`:equipmentModelId`**: Passes the selected equipment model's ID to the modal.

## Event Handling

- **`@updateVisible`**: Listens for the visibility state change of the `EquipmentHistoryModal` to ensure the `visible` property stays in sync.

## Usage Example

This component can be used as part of a dashboard to monitor real-time equipment positions and statuses. Here's an example of how it might be integrated into a larger application:

```vue
<template>
  <div class="equipment-dashboard">
    <h1>Equipment Map</h1>
    <EquipmentMap />
  </div>
</template>

<script setup lang="ts">
import EquipmentMap from '@/components/EquipmentMap.vue'
</script>
```
