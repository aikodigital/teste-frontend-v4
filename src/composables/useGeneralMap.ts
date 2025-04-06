import L from 'leaflet'
import { ref } from 'vue'
import garra from '@/assets/img/garra.png'
import carga from '@/assets/img/caminhao-de-carga.png'
import harvester from '@/assets/img/combine-harvester.png'
import { normalizeIsoDate } from '@/utils/utils'
import type { IEquipmentSummary } from '@/types/equipment.types'

const map = ref<L.Map>()

export const useGeneralMap = () => {
  const iconMap: Record<string, string> = {
    'Garra traçadora': garra,
    'Caminhão de carga': carga,
    'Harvester': harvester,
  }

  const createMap = (containerId: string, equipments: IEquipmentSummary[]) => {
    if (!equipments.length) return

    const center = equipments[equipments.length - 1].lastPosition
    map.value = L.map(containerId).setView([center?.lat ?? 0, center?.lon ?? 0], 10)

    setTimeout(() => {
      map.value!.invalidateSize()
    }, 500)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.value!)

    equipments.forEach(equipment => {
      const icon = L.icon({
        iconUrl: iconMap[equipment.modelName ?? 0] || '',
        iconSize: [41, 41],
        iconAnchor: [30, 20],
      })

      const popupContent = `
        <strong>${equipment.equipmentName}</strong><br/>
        Modelo: ${equipment.modelName}<br/>
        Estado: <span style="color:${equipment.lastStateColor}">${equipment.lastStateName}</span><br/>
        Última atualização: ${normalizeIsoDate(equipment?.lastPositionDate || '')} <br/><br/>
        Últimos estados:<br/>
        ${equipment.recentStates?.map(state => `
          <span style="color:${state.color}">
            ${state.name}
          </span> - ${normalizeIsoDate(state?.date ?? '')}`).join('<br/>') ?? ''
        }
      `
      L.marker([equipment?.lastPosition?.lat ?? 0, equipment?.lastPosition?.lon ?? 0], { icon })
        .addTo(map.value!)
        .bindPopup(popupContent)
    })
  }

  const destroyMap = () => {
    if (map.value) {
      map.value.remove()
    }
  }

  return {
    createMap,
    destroyMap,
    map
  }
}