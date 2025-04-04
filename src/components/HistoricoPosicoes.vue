<template>
  <div id="historicoPosicoes"></div>
</template>

<style scoped>
#historicoPosicoes {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 8px;
  border: solid 2px rgba(var(--cinereous), 0.5);
}
</style>

<script setup lang="ts">
import { onMounted, type PropType } from 'vue'
import type { Equipamento, Posicao } from '@/types/Equipamento'
import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet'
import { Icons, type IconKeys } from './icons/Icons'
import 'leaflet-arrowheads'

const props = defineProps({
  equipamento: {
    type: Object as PropType<Equipamento>,
    required: true,
  },
})

const criarMarcador = (posicao: Posicao) => {
  const div = document.createElement('div')

  div.innerHTML = `
    ${Icons[props.equipamento.modelo.nome as IconKeys]}
  `

  const customIcon = L.divIcon({
    className: 'Marcador MarcadorHistoricoPosicao',
    html: div,
    iconSize: [130, 80],
    iconAnchor: [0, 0],
  })

  return L.marker([posicao.latitude, posicao.longitude], { icon: customIcon })
}

onMounted(() => {
  const ultimaPosicao: Posicao = props.equipamento.posicoes[props.equipamento.posicoes.length - 1]

  let mapa: L.Map | null = L.map('historicoPosicoes', {
    zoom: 12,
    center: [ultimaPosicao.latitude, ultimaPosicao.longitude],
  })

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(mapa)

  for (let index = 8; index >= 1; index--) {
    const posicao: Posicao =
      props.equipamento.posicoes[props.equipamento.posicoes.length - (index + 1)]
    const proximaPosicao: Posicao =
      props.equipamento.posicoes[props.equipamento.posicoes.length - index]

    L.polyline(
      [
        L.latLng(posicao.latitude, posicao.longitude),
        L.latLng(proximaPosicao.latitude, proximaPosicao.longitude),
      ],
      {
        color: '#3F292C',
        weight: 1,
      },
    )
      .arrowheads({
        size: '4px',
        yawn: 60,
        fill: true,
        frequency: '30px',
      })
      .addTo(mapa)

    if (index == 8) {
      const marker = criarMarcador(posicao)
      marker.addTo(mapa!)
    } else if (index == 1) {
      const marker = criarMarcador(proximaPosicao)
      marker.addTo(mapa!)
    }
  }
})
</script>
