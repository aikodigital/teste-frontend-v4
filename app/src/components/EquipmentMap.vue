<template>
    <div id="map" class="w-full h-96 rounded-md"></div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';
import { Position } from '../stores/equipmentStore';

export default defineComponent({
    name: 'EquipmentMap',
    props: {
        initialPosition: {
            type: Object as () => Position | null,
            default: null
        }
    },
    setup(props, { expose }) {
        const map = ref<google.maps.Map | null>(null);
        const marker = ref<google.maps.Marker | null>(null);
        const defaultPosition = ref<Position | null>(props.initialPosition);

        onMounted(async () => {
            const loader = new Loader({
                apiKey: import.meta.env.VITE_API_KEY,
                version: 'weekly',
                libraries: ['marker'],
            });

            await loader.load();

            const mapElement = document.getElementById('map');
            if (mapElement && defaultPosition.value) {
                map.value = new google.maps.Map(mapElement as HTMLElement, {
                    center: defaultPosition.value,
                    zoom: 10,
                });

                marker.value = new google.maps.Marker({
                    position: defaultPosition.value,
                    map: map.value,
                    title: 'initial',
                });
            }
        });

        function updatePosition(position: Position) {
            if (isNaN(position.lat) || isNaN(position.lng)) {
                console.error('Invalid position', position);
                return;
            }

            if (map.value && marker.value) {
                map.value.setCenter(position);
                marker.value.setPosition(position);
            } else if (map.value) {
                marker.value = new google.maps.Marker({
                    position,
                    map: map.value,
                    title: 'new',
                });
            }
        }

        expose({ updatePosition });

        return {};
    },
});
</script>