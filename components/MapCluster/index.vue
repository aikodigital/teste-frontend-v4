<template>
  <v-container>
    <v-row>
      <v-col v-if="equipamentPositions.length > 0" cols="12" md="12" sm="4">
        <GoogleMap
          api-key="AIzaSyAbhpwTTqP7cwbfd4nNjTGcFtDUJbxofmI"
          mapId="b21087b65bb7d8b"
          style="width: 100%; height: 500px"
          :center="center"
          :zoom="10"
          >
          <MarkerCluster>
            <CustomMarker 
              v-for="(equipment) in equipamentPositions"
              :key="equipment.equipmentId"
              :options="{ 
                position: {
                  lat: equipment.lastPosition.lat,
                  lng: equipment.lastPosition.lon
                }
              }"
            >
            <div class="custom-marker" @click="selectEquipment(equipment.equipmentId)">
              <v-icon size="large" :icon="getMarkerIcon(equipment.equipmentId)" class="custom-marker__icon" />
              <div  class="custom-marker__name">
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
                <InfoEquipment :equipment="selectedEquipment" :allStatus="allStatus" />
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
import type { IEquipmentInfo, IEquipmentPositionHistory } from '@/interfaces/IEquipament';
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
      selectedEquipment: {} as IEquipmentInfo | null
    }
  },

  components: {
    GoogleMap,
    CustomMarker,
    MarkerCluster,
    InfoWindow
  },

  async mounted () {
    this.equipamentPositions = await EquipmentService.getEquipmentPositions()
    this.center = this.getInitialCenter()
  },

  methods: {
    getInitialCenter() {
      return {
        lat: this.equipamentPositions[0].lastPosition.lat,
        lng: this.equipamentPositions[0].lastPosition.lon
      }
    },

    async selectEquipment(equipmentId: string) {
      this.selectedEquipment = await this.formatSelectedEquipment(equipmentId)
    },

    onInfoWindowClose() {
      this.selectedEquipment = null
    },
  }
}
</script>
<style lang="css" src="./index.scss" scoped></style>