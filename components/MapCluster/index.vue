<template>
  <v-container>
    <v-row class="map-cluster">
      <v-col v-if="equipamentPositions.length > 0" cols="12" md="12" sm="4">
        <div class="py-4 mb-3 d-flex align-center">
          <span class="pr-3 map-cluster__filter-span">Filtros rápidos:</span>
          <div class="map-cluster__filter">
            <span
              v-for="equipment in getFilters"
              :key="equipment.equipmentId"
              class="map-cluster__filter--pill"
              :class="{ 'map-cluster__filter--selected': equipment.status }"
              @click="filterByName(equipment)"
            >
              {{ equipment.name }}
            </span>
          </div>
        </div>
        <GoogleMap
          :api-key="apiKey"
          :mapId="mapId"
          style="width: 100%; height: 500px"
          :center="center"
          :zoom="10"
          >
          <MarkerCluster>
            <CustomMarker 
              v-for="(equipment) in getEquipamentPositions"
              :key="equipment.equipmentId"
              :options="{ 
                position: {
                  lat: equipment.lastPosition.lat,
                  lng: equipment.lastPosition.lon
                }
              }"
            >
            <div class="map-cluster__custom-marker" @click="selectEquipment(equipment.equipmentId)">
              <v-icon size="large" :icon="getMarkerIcon(equipment.equipmentId)" />
              <div>
                {{ getEquipmentName(equipment.equipmentId) }}
              </div>
            </div>
            <template v-if="selectedEquipment && selectedEquipment.equipmentId === equipment.equipmentId">
              <InfoWindow 
                :options="{ 
                  position: {
                    lat: equipment.lastPosition.lat,
                    lng: equipment.lastPosition.lon
                  },
                }"
                @closeclick="onInfoWindowClose"
              >
                <InfoEquipment :equipment="selectedEquipment" :all-status="allStatus" />
              </InfoWindow>
            </template>
            </CustomMarker>
          </MarkerCluster>
        </GoogleMap>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { GoogleMap, CustomMarker , MarkerCluster, InfoWindow } from 'vue3-google-map'
import EquipmentService from '@/services/EquipmentService';
import type { IEquipmentFilterName, IEquipmentInfo, IEquipmentPositionHistory } from '@/interfaces/IEquipament';
import EquipmentMixin from '@/mixins/EquipmentMixin';

type MapPosition = {
  lat: number,
  lng: number
}

export default {
  name: 'MapCluster',

  mixins: [EquipmentMixin],

  data () {
    return {
      center: undefined as MapPosition | undefined,
      equipamentPositions: [] as IEquipmentPositionHistory[],
      selectedEquipment: {} as IEquipmentInfo | null,
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      mapId: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID,
      filteredData: [] as IEquipmentPositionHistory[],
      filters: [] as IEquipmentFilterName[]
    }
  },

  components: {
    GoogleMap,
    CustomMarker,
    MarkerCluster,
    InfoWindow
  },

  async mounted () {
    this.equipamentPositions = await EquipmentService.getEquipmentPositions();
    this.center = this.getInitialCenter();
    this.filters = this.mountFilters()
  },

  computed: {
    /**
     * Retrieves the list of equipment filters.
     * 
     * @returns {IEquipmentFilterName[]} An array of equipment filter names.
     */
    getFilters(): IEquipmentFilterName[] {
      return this.filters
    },

    /**
     * Retrieves the equipment positions based on the filtered data.
     * If there are no filtered data, it returns the original equipment positions.
     * 
     * @returns {IEquipmentPositionHistory[]} An array of equipment position history objects.
     */
    getEquipamentPositions(): IEquipmentPositionHistory[] {
      return this.filteredData.length > 0 ? this.filteredData : this.equipamentPositions
    }
  },

  methods: {
    /**
     * Gets the initial center position for the map based on the first equipment's last position.
     * 
     * @returns {MapPosition} An object containing the latitude and longitude of the initial center.
     */
    getInitialCenter() :MapPosition {
      return {
        lat: this.equipamentPositions[0].lastPosition.lat,
        lng: this.equipamentPositions[0].lastPosition.lon
      }
    },

    /**
     * Selects the equipment based on the provided equipment ID and formats the selected equipment data.
     * 
     * @param {string} equipmentId - The ID of the equipment to select.
     * @returns {Promise<void>} A promise that resolves when the equipment has been selected.
     */
    async selectEquipment(equipmentId: string): Promise<void> {
      this.selectedEquipment = await this.formatSelectedEquipment(equipmentId);
    },

    /**
     * Closes the information window and resets the selected equipment.
     */
    onInfoWindowClose(): void {
      this.selectedEquipment = null;
    },

    /**
     * Mounts the filters based on the equipment positions.
     * 
     * @returns {IEquipmentFilterName[]} An array of equipment filter names with their IDs and statuses.
     */
    mountFilters(): IEquipmentFilterName[] {
      return this.equipamentPositions.map(equipment => {
        const { equipmentId } = equipment
        return {
          name: this.getEquipmentName(equipmentId),
          equipmentId: equipmentId,
          status: false
        }
      })
    },

    /**
     * Filters the equipment by name, adding or removing it from the filtered data.
     * 
     * @param {IEquipmentFilterName} equipment - The equipment filter to toggle.
     */
    filterByName(equipment: IEquipmentFilterName): void {
      const filteredEquipment = this.equipamentPositions.find(equip => equip.equipmentId === equipment.equipmentId);

      if (filteredEquipment) {
        const index = this.filteredData.findIndex(equip => equip.equipmentId === filteredEquipment.equipmentId);
        if (index !== -1) {
          this.filteredData.splice(index, 1); 
        } else {
          this.filteredData.push(filteredEquipment); 
        }
      }
      equipment.status = !equipment.status;
    }
  },
}
</script>
<style lang="css" src="./index.scss" scoped></style>