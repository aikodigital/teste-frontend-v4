'use client'

import { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import dynamic from 'next/dynamic'

interface EquipmentPosition {
  id: string
  name: string
  modelId: string
  position: [number, number]
  currentStatus: string
}

interface MapComponentProps {
  equipmentPositions: EquipmentPosition[]
}

const MapComponent: React.FC<MapComponentProps> = ({ equipmentPositions }) => {
  useEffect(() => {
    const map = L.map('map').setView([0, 0], 2)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)

    const getCustomIcon = (modelId: string) => {
      let iconUrl = ''
      switch (modelId) {
        case 'a3540227-2f0e-4362-9517-92f41dabbfdf':
          iconUrl = '/img/caminhaoDeCarga.png'
          break
        case 'a4b0c114-acd8-4151-9449-7d12ab9bf40f':
          iconUrl = '/img/harvester.png'
          break
        case '9c3d009e-0d42-4a6e-9036-193e9bca3199':
          iconUrl = '/img/garraTracadora.png'
          break
        default:
          iconUrl =
            'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'
      }

      return L.divIcon({
        className: 'custom-icon',
        html: `<div style="
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #003380;
          overflow: hidden;
          background: white;
        ">
          <img src="${iconUrl}" style="
            width: 100%;
            height: 100%;
            object-fit: cover;
          "/>
        </div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20],
      })
    }

    equipmentPositions.forEach((equipment) => {
      const popupContent = `
        <div style="text-align: center;">
          <h3>${equipment.name}</h3>
          <p>Status: ${equipment.currentStatus}</p>
          <a href="/equipments/details/${equipment.id}" style="
            display: inline-block;
            padding: 5px 10px;
            background-color: #003380;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          ">Ver mais</a>
        </div>
      `

      L.marker(equipment.position, { icon: getCustomIcon(equipment.modelId) })
        .addTo(map)
        .bindPopup(popupContent)
    })

    if (equipmentPositions.length > 0) {
      const bounds = L.latLngBounds(equipmentPositions.map((e) => e.position))
      map.fitBounds(bounds)
    }

    return () => {
      map.remove()
    }
  }, [equipmentPositions])

  return <div id="map" style={{ height: '100%', width: '100%' }} />
}

export default dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
})
