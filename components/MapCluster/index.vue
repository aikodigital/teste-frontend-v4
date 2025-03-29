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
            <div class="custom-marker">
              <v-icon icon="mdi-truck-outline" class="custom-marker__icon" />
              <v-icon icon="mdi-tractor-variant" class="custom-marker__icon" />
              <v-icon icon="mdi-rake" class="custom-marker__icon" />
              <div  class="custom-marker__name">
                {{ getEquipmentName(equipment.equipmentId) }}
              </div>
            </div>
            </CustomMarker>
          </MarkerCluster>
        </GoogleMap>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { GoogleMap, CustomMarker , MarkerCluster  } from 'vue3-google-map'
import EquipamentService from '@/services/EquipmentService';
import type { IEquipmentPositionHistory } from '~/interfaces/IEquipament';
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
    }
  },

  components: {
    GoogleMap,
    CustomMarker,
    MarkerCluster
  },

  async mounted () {
    this.equipamentPositions = await EquipamentService.getEquipmentPositions()
    this.center = this.getInitialCenter()
  },

  methods: {
    getInitialCenter() {
      return {
        lat: this.equipamentPositions[0].lastPosition.lat,
        lng: this.equipamentPositions[0].lastPosition.lon
      }
    }
  }
}
</script>
<style lang="css" src="./index.scss" scoped></style>