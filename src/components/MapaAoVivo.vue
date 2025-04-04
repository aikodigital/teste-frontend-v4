<template>
  <section>
    <div class="Container">
      <Filtro />
      <div id="mapa"></div>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 40px 0;
  color: rgba(var(--van-dyke), 1);
  background-color: rgba(var(--cinereous), 0.2);
  text-align: center;
}

.Container {
  margin: 0 auto;
  padding: 10px;
  max-width: 980px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#mapa {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 0px 0px 8px 8px;
  border: solid 2px rgba(var(--cinereous), 0.5);
  border-top: none;
}
</style>

<script setup lang="ts">
import Filtro from './Filtro.vue'
import { onMounted, onUnmounted, watch } from 'vue'
import { useEquipamentoStore } from '@/stores/equipamento'
import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet'
import type { Equipamento, Posicao, RegistroEstado } from '@/types/Equipamento'
import { Icons, type IconKeys } from './icons/Icons'

const equipamentoStore = useEquipamentoStore()
let mapa: L.Map | null = null
const markers: L.Marker[] = []

const limparMarcadores = () => {
  markers.forEach((marker) => marker.removeFrom(mapa!))
  markers.length = 0
}

const criarMarcador = (e: Equipamento) => {
  const ultimoStatus: RegistroEstado = e.registros[e.registros.length - 1]
  const ultimaPosicao: Posicao = e.posicoes[e.posicoes.length - 1]
  const div = document.createElement('div')

  div.style.setProperty('--cor', ultimoStatus.estado.cor)
  div.innerHTML = `
    ${Icons[e.modelo.nome as IconKeys]}
    <p class="Nome">${e.nome}</p>
    <p class="Modelo">${e.modelo.nome}</p>
  `

  Object.assign(div.dataset, {
    nome: e.nome,
  })

  const onClick = (e: MouseEvent) => {
    e.stopPropagation()
    const target = e.currentTarget as HTMLDivElement
    equipamentoStore.exibirDetalhes(target.dataset.nome!)
  }

  div.addEventListener('click', onClick)

  const customIcon = L.divIcon({
    className: `Marcador ${e.exibirDetalhes ? 'Selecionado' : 'Desselecionado'}`,
    html: div,
    iconSize: [130, 80],
    iconAnchor: [0, 0],
  })

  return L.marker([ultimaPosicao.latitude, ultimaPosicao.longitude], { icon: customIcon })
}

const atualizarMarcadores = () => {
  if (!mapa) return

  limparMarcadores()

  equipamentoStore.equipamentos.forEach((e) => {
    if (!(e.exibirNoMapaAoVivo === false)) {
      const marker = criarMarcador(e)
      marker.addTo(mapa!)
      markers.push(marker)
    }
  })
}

onMounted(() => {
  mapa = L.map('mapa', {
    zoom: 11,
    center: [-19.1, -46.0],
  })

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(mapa)

  atualizarMarcadores()
})

watch(
  () => equipamentoStore.equipamentos,
  () => {
    atualizarMarcadores()
  },
  { deep: true },
)

onUnmounted(() => {
  if (mapa) {
    mapa.remove()
    mapa = null
  }
})
</script>
