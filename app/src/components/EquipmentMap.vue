<template>
    <div id="map" class="w-full h-screen"></div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';

export default {
    name: 'EquipmentMap',
    props: {
        initialPosition: {
            type: Object as () => { lat: number, lng: number } | null,
            default: null
        }
    },
    setup(props, { expose }) {
        const map = ref<google.maps.Map | null>(null);
        const marker = ref<google.maps.Marker | null>(null);
        const defaultPosition = ref<{ lat: number, lng: number } | null>(props.initialPosition);

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

        function updatePosition(position: { lat: number, lng: number }) {
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
};
</script>