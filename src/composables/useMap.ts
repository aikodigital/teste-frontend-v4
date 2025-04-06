import L from 'leaflet'
import garra from '@/assets/img/garra.png'
import carga from '@/assets/img/caminhao-de-carga.png'
import harvester from '@/assets/img/combine-harvester.png'

interface Marker {
  lat: number
  lon: number
  date: string
}

export const useMap = () => {
  let map: L.Map | null = null

  const iconMap: Record<string, string> = {
    '9c3d009e-0d42-4a6e-9036-193e9bca3199': garra,
    'a3540227-2f0e-4362-9517-92f41dabbfdf': carga,
    'a4b0c114-acd8-4151-9449-7d12ab9bf40f': harvester,
  }

  const createMap = (containerId: string, marker: Marker, description: string, equipmentModelId: string) => {
    if (map) {
      map.remove()
    }

    map = L.map(containerId).setView([marker.lat, marker.lon], 10)

    setTimeout(() => {
      map?.invalidateSize()
    }, 100)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    const markerIcon = L.icon({
      iconUrl: iconMap[equipmentModelId] || '',
      iconSize: [41, 41],
      iconAnchor: [30, 20]
    })

    L.marker([marker.lat, marker.lon], { icon: markerIcon })
      .addTo(map)
      .bindPopup(description)
  }

  const destroyMap = () => {
    if (map) {
      map.remove()
      map = null
    }
  }

  return {
    createMap,
    destroyMap
  }
}