<template>
    <div ref="mapElement" class="w-full h-96 rounded-md bg-slate-200"></div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent, watch, PropType } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';
import { Equipment, Position } from '../stores/equipmentStore';
import { modelIcons } from '../utils/icons';

export default defineComponent({
    name: 'EquipmentMap',
    props: {
        initialPosition: {
            type: Object as () => Position | null,
            default: null
        },
        selectedEquipment: {
            type: Object as PropType<Equipment>,
            required: true
        },
        positionHistory: {
            type: Array as PropType<Position[]>,
            default: () => []
        },
        viewPath: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    setup(props, { expose }) {
        const map = ref<google.maps.Map | null>(null);
        const marker = ref<google.maps.Marker | null>(null);
        const mapElement = ref<HTMLElement | null>(null);
        let currentPath: google.maps.Polyline | null = null;

        const initializeMap = async (position: Position) => {
            const loader = new Loader({
                apiKey: import.meta.env.VITE_API_KEY,
                version: 'weekly',
                libraries: ['marker'],
            });
            await loader.load();

            createMap(position);
        };

        const createMap = (position: Position) => {
            if (mapElement.value && position) {
                map.value = new google.maps.Map(mapElement.value as HTMLElement, {
                    center: convertPositionToLatLng(position),
                    zoom: 10,
                });
                updateMarker(position);
            } else {
                console.error('Map element or position is not available.');
            }
        };

        const updateMarker = (position: Position) => {
            if (!map.value) return;

            const modelName = props.selectedEquipment.model?.name ?? 'Unknown Model';
            const iconUrl = modelIcons[modelName] ?? null;

            if (!iconUrl) {
                console.warn(`Icon URL not found for model: ${modelName}`);
                return;
            }

            const icon: google.maps.Icon = {
                url: iconUrl,
                scaledSize: new google.maps.Size(40, 40),
            };

            if (marker.value) {
                marker.value.setMap(null);
            }

            marker.value = new google.maps.Marker({
                position: convertPositionToLatLng(position),
                map: map.value!,
                title: props.selectedEquipment.name,
                icon: icon,
            });
        };

        const drawPath = (positions: Position[]) => {
            if (!map.value) return;

            if (currentPath) {
                currentPath.setMap(null);
            }

            if (positions.length > 0) {
                const path = positions.map(position => convertPositionToLatLng(position));

                currentPath = new google.maps.Polyline({
                    path: path,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                });

                currentPath.setMap(map.value);
            }
        };

        const clearPath = () => {
            if (currentPath) {
                currentPath.setMap(null);
                currentPath = null;
            }
        };

        const updatePosition = (position: Position) => {
            if (map.value) {
                map.value.setCenter(convertPositionToLatLng(position));
                updateMarker(position);
            }
        };

        const convertPositionToLatLng = (position: Position): google.maps.LatLng => {
            return new google.maps.LatLng(position.lat, position.lon);
        };

        onMounted(() => {
            if (props.initialPosition) {
                initializeMap(props.initialPosition);
            }
        });

        watch(() => props.viewPath, (newValue) => {
            newValue ? drawPath(props.positionHistory) : clearPath();
        });

        expose({
            drawPath,
            updatePosition,
            updateMarker,
            clearPath
        });

        return {
            mapElement
        };
    }
});
</script>
