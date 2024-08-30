import { useMapStore } from '@/store/EquipmentStore'
import type { EquipmentData } from '@/types/EquipmentTypes'
import { markerIcon, markerPopup } from '@/utils/MarkersTemplate'
import Leaflet, { type Map } from 'leaflet'
import { toRaw } from 'vue'
import { getEquipmentById } from './EquipmentService'

export function createMap(mapId: string) {
  const map = Leaflet.map(mapId, {
    zoom: 1,
    zoomAnimation: false
  }).setView([-19, -46], 10)

  if (!map) throw new Error('Map not created')

  Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 5
  }).addTo(map as Map)

  return map
}

export async function setEquipmentsMarker(map: Map, equipments: EquipmentData[]) {
  const mapStore = useMapStore()

  clearMarkers(map)

  for (const data of equipments) {
    const icon = await markerIcon(data, true)
    const popup = await markerPopup(data)

    const marker = Leaflet.marker([data.isLatestPosition.lat, data.isLatestPosition.lon], {
      icon: Leaflet.divIcon({ html: icon })
    })

    mapStore.markers.push(marker)

    marker
      .bindPopup(popup)
      .addTo(toRaw(map))
      .on('click', () => {
        map.scrollWheelZoom.enable()
        setEquipmentsMarkerById(map, equipments, data.id)
      })

    marker.on('mouseover', function () {
      marker.openPopup()
    })

    marker.on('mouseout', function () {
      marker.closePopup()
    })
  }
}

function clearMarkers(map: Map) {
  const mapStore = useMapStore()

  if (!map) throw new Error('Map not found')

  mapStore.markers.forEach((marker: any) => {
    map.removeLayer(marker as L.Marker)
  })
  mapStore.markers = []
}

export async function setEquipmentsMarkerById(
  map: Map,
  equipments: EquipmentData[],
  equipmentId: string
) {
  const mapStore = useMapStore()

  clearMarkers(map)

  mapStore.equipmentId = equipmentId

  const equipmentSelected = getEquipmentById(equipmentId, equipments)

  if (!equipmentSelected) throw new Error('Equipment not found')

  for (const position of equipmentSelected.historyPositions.positions) {
    const isLatestPosition = equipmentSelected.isLatestPosition === position

    const icon = await markerIcon(equipmentSelected, isLatestPosition)
    const popup = await markerPopup(
      { ...equipmentSelected, isLatestPosition: position },
      isLatestPosition
    )

    const marker = Leaflet.marker([position.lat, position.lon], {
      icon: Leaflet.divIcon({ html: icon }),
      zIndexOffset: isLatestPosition ? 100 : 0
    })

    marker.bindPopup(popup).addTo(toRaw(map as Map))
  }
}
