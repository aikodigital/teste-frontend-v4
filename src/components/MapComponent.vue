<template>
<div>
  <div ref="mapContainer" class="map-container">
  </div>
  <DiaglogHistory ref="dialogHistory" />
</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';
import DiaglogHistory from './DialogHistory.vue';

const mapContainer = ref(null);
const dialogHistory = ref(null);

defineOptions({
  name: 'Map',
  components: { DiaglogHistory }
});

interface Marker {
  date: Date
  lat: number
  lon: number
}

interface Props {
  Markers: Array<Marker>
}

const props = defineProps<Props>();

function ShowHistory() {
  dialogHistory.value.dialog = true;
};

onMounted(() => {
  const loader = new Loader({
    apiKey: 'AIzaSyCVS-x94fxB1PqRrWGCwsiW8Zv5hmPXCC0',
    version: 'weekly'
  });

  loader.load().then(() => {
    const markersData = props.Markers.map(marker => {
      return {
        lat: marker.lat,
        lng: marker.lon,
        date: marker.date
      }
    })

    const map = new google.maps.Map(mapContainer.value, {
      center: markersData[0],
      zoom: 10,
    });

    markersData.forEach(markerData => {
      const marker = new google.maps.Marker({
        map: map,
        position: { lat: markerData.lat, lng: markerData.lng },
        title: markerData.date
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<div>${marker.title}</div>`
      });

      marker.addListener('mouseover', () => {
        infoWindow.open(map, marker);
      });
      marker.addListener('mouseout', () => {
        infoWindow.close();
      });
      marker.addListener('click', () => ShowHistory());
    });
  });
});
</script>

<style lang="scss" scoped>
.map-container {
  width: 100%;
  min-height: 550px;
  border: 1px solid $secondary;
  padding: 100px;
  position: absolute;
}
</style>
