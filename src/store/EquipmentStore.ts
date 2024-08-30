import { type Map, type Marker } from 'leaflet'
import { defineStore } from 'pinia'

export const useMapStore = defineStore('maps', {
  state: () => ({
    markers: [] as Marker[],
    map: null as Map | null,
    equipmentId: '' as string,
    search: '' as string,
    searchNotFound: false as boolean
  })
})
