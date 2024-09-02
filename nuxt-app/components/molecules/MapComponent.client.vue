<template>
  <LMap class="map-content-component" :zoom="5" :center="[-15.7801, -49.0391]">
    <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      layer-type="base"
      name="OpenStreetMap"
    />
    <div v-for="(equipment, key) in equipments">
      <LMarker
        :lat-lng="[
          equipment.mostRecentlyPosition.lat,
          equipment.mostRecentlyPosition.lon,
        ]"
        :radius="8"
        :icon="getIcon(equipment)"
        @click="() => openDialog(equipment)"
        ><LTooltip>
          <div class="content-tooltip">
            <span class="title-tooltip"
              >{{ equipment.name }} - {{ equipment.model.name }}</span
            >
            <span class="current-state">
              Status:
              {{ showTrajectory }}
              <Chip
                :text-content="equipment.mostRecentlyState.stateReference?.name"
                :color="equipment.mostRecentlyState.stateReference?.color"
              />
            </span>
          </div> </LTooltip
      ></LMarker>

      <LPolyline
        v-if="showTrajectory"
        :lat-lngs="getPosition(equipment.positionHistory.positions)"
        :color="equipment.color"
      />
    </div>
  </LMap>
</template>

<script setup lang="ts">
import type {
  IEquipmentNormalized,
  IPositions,
} from '~/interfaces/equipments.interface';
import L from 'leaflet';
const { emit } = useEventBus();
const { on } = useEventBus();

const store = useNormalizedData();
const { equipmentsFiltered: equipments } = storeToRefs(store);

const showTrajectory = ref(false);

on('switchTrajectory', (value: boolean) => {
  showTrajectory.value = value;
});

function getIcon(equipment: IEquipmentNormalized): L.Icon<L.IconOptions> {
  const adjustColor = (hex: string, amount: number = 90) => {
    hex = hex.replace(/^#/, '');

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    const luminosity = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    const adjustment = amount * (luminosity < 0.5 ? 1 : -1);

    r = Math.min(255, Math.max(0, r + adjustment));
    g = Math.min(255, Math.max(0, g + adjustment));
    b = Math.min(255, Math.max(0, b + adjustment));

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  };

  return L.divIcon({
    className: 'my-custom-pin',
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 34.892337" height="60" width="40">
  <g transform="translate(-814.59595,-274.38623)">
    <g transform="matrix(1.1855854,0,0,1.1855854,-151.17715,-57.3976)">
      <path d="m 817.11249,282.97118 c -1.25816,1.34277 -2.04623,3.29881 -2.01563,5.13867 0.0639,3.84476 1.79693,5.3002 4.56836,10.59179 0.99832,2.32851 2.04027,4.79237 3.03125,8.87305 0.13772,0.60193 0.27203,1.16104 0.33416,1.20948 0.0621,0.0485 0.19644,-0.51262 0.33416,-1.11455 0.99098,-4.08068 2.03293,-6.54258 3.03125,-8.87109 2.77143,-5.29159 4.50444,-6.74704 4.56836,-10.5918 0.0306,-1.83986 -0.75942,-3.79785 -2.01758,-5.14062 -1.43724,-1.53389 -3.60504,-2.66908 -5.91619,-2.71655 -2.31115,-0.0475 -4.4809,1.08773 -5.91814,2.62162 z" style="fill:${equipment.color};stroke:#fff;"/>
    <circle r="3.0355" cy="288.25278" cx="823.03064" id="path3049" style="display:inline;fill:${adjustColor(equipment.color)};"/>
    </g>
  </g>
</svg>`,
  }) as L.Icon<L.IconOptions>;
}

function openDialog(equipment: IEquipmentNormalized) {
  emit('openDialog', equipment);
}

function getPosition(positions: IPositions[]): [number, number][] {
  const total = positions.map((position) => {
    return [position.lat, position.lon] as [number, number];
  });

  return total;
}
</script>

<style>
.content-tooltip {
  display: flex;
  flex-direction: column;
}

.map-content-component {
  border-radius: 3px;
  height: 735px !important;
  box-shadow:
    rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
}

@media (max-width: 768px) {
  .map-content-component {
    height: 450px !important;
  }
}

@media (max-width: 465px) {
  .map-content-component {
    height: 350px !important;
  }
}
</style>
