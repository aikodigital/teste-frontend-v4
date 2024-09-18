<template>
  <div class="mapa-layout">
    <l-map
      v-if="ready"
      id="map"
      ref="myMap"
      :zoom="zoom"
      :center="center"
      @update:center="centerUpdated"
      @update:zoom="zoomUpdated"
    >
      <!-- @click="handleMapClick" -->
      <l-tile-layer
        :url="url"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <!-- <l-marker :lat-lng="markerLatLng">
        <l-popup>
          {{ "New Marker: " + markerLatLng }}<br />
          {{ "Center: " + center }}
        </l-popup>
      </l-marker> -->
      <!-- <l-marker
        v-for="(picole, index) in picoleLatLng"
        :key="index"
        :lat-lng="[picole.lat, picole.log]"
        :icon="icon"
      >
        <l-popup>
          {{ picole.info }}
        </l-popup>
      </l-marker> -->
      <l-marker
        v-for="(equip, index) in equipmentsLatLng"
        :key="index"
        :lat-lng="[equip.lat, equip.log]"
        :icon="setStateIcon(equip)"
      >
        <l-popup>
          <div class="q-py-xs q-gutter-y-sm" style="text-align-last: center">
            <div>{{ equip.info }} - {{ equip.state }}</div>
            <div>
              <q-btn
                style="inline-size: max-content"
                class="bg-indigo-10 text-white"
                icon="info_outline"
                label="Detalhes"
                size="sm"
                @click="getEquipDetails(equip)"
              />
            </div>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
      style="z-index: 1000"
    >
      <!-- <q-btn fab icon="center_focus_strong" color="primary" @click="getLoc" /> -->
      <q-fab
        v-model="fabMap"
        color="indigo-10"
        glossy
        icon="keyboard_arrow_up"
        direction="up"
      >
        <q-fab-action
          color="indigo-10"
          @click="getLoc"
          icon="center_focus_strong"
        >
          <q-tooltip anchor="center left" self="center right" :offset="[10, 10]"
            >Centralizar Mapa</q-tooltip
          >
        </q-fab-action>
        <q-fab-action
          color="indigo-10"
          @click="filterDialog = true"
          icon="filter_list"
        >
          <q-tooltip anchor="center left" self="center right" :offset="[10, 10]"
            >Filtrar dados</q-tooltip
          >
        </q-fab-action>
      </q-fab>
    </q-page-sticky>
  </div>
  <q-dialog v-model="equipDialog">
    <q-card class="card q-pa-md" style="width: 500px; min-height: 460px">
      <q-card-section>
        <div class="text-h6 text-indigo-10">
          <q-icon
            class="q-pr-sm"
            name="fa-solid fa-screwdriver-wrench"
            size="md"
            color="indigo-10"
          />
          Detalhes do equipamento
        </div>
      </q-card-section>
      <q-card-section
        class="row q-pt-none q-px-md q-pb-md items-center"
        style="display: inline-flex"
      >
        <!-- {{ equipamentoDetalhes }} -->
        <q-tabs v-model="tabEquip" align="justify" class="text-indigo-10">
          <q-tab name="informacoes" label="Informações" />
          <q-tab name="historico" label="Histórico" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tabEquip" animated class="full-width">
          <q-tab-panel name="informacoes" style="height: 30vh">
            <div class="q-gutter-y-md row items-start">
              <div class="col-md-6">
                <div class="text-subtitle1 text-weight-medium">Nome</div>
                {{ equipamentoDetalhes.nomeEquipamento }}
              </div>
              <div class="col-md-6">
                <div class="text-subtitle1 text-weight-medium">Modelo</div>
                {{ equipamentoDetalhes.modeloEquipamento.name }}
              </div>
              <div class="col-md-6">
                <div class="text-subtitle1 text-weight-medium">Estado</div>
                <i
                  :class="setStateIconModal(estadoEquipamentoSelecionado)"
                  class="fa-solid fa-circle-exclamation fa-fade"
                ></i>
                {{ estadoEquipamentoSelecionado }}
              </div>
              <div class="col-md-6">
                <div class="text-subtitle1 text-weight-medium">
                  Útima Atualização
                </div>
                {{ ultimaAtualizacaoEquipamentoSelecionado }}
              </div>
              <div class="col-md-12">
                <div class="text-subtitle1 text-weight-medium">
                  Percentual de produtividade do equipamento
                </div>
                {{ horasProdutivasSelecionado }}
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="historico" style="height: 30vh">
            <q-list bordered separator>
              <q-item
                v-for="(
                  history, index
                ) in equipamentoDetalhes.historicoEquipamento"
                :key="index"
              >
                <q-item-section>
                  <div class="text-md">
                    Data:
                    {{
                      utils.formatarDataGMT(history.date, "DD/MM/YYYY HH:MM:SS")
                    }}
                  </div>
                  <div class="q-mt-sm text-md">
                    Estado: {{ history.stateName }}
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Fechar" color="indigo-10" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="filterDialog">
    <q-card class="card q-pa-md">
      <q-card-section>
        <div class="text-h6 text-indigo-10">
          <q-icon class="q-pr-sm" name="filter_alt" size="md" />
          Filtrar Dados
        </div>
      </q-card-section>
      <q-card-section class="row items-center">
        <div>
          <div class="text-subtitle1 q-pl-sm">Estado</div>
          <q-checkbox
            v-model="filters.states"
            val="Operando"
            label="Operando"
          />
          <q-checkbox v-model="filters.states" val="Parado" label="Parado" />
          <q-checkbox
            v-model="filters.states"
            val="Manutenção"
            label="Manutenção"
          />
        </div>
      </q-card-section>
      <q-separator spaced inset vertical dark />
      <q-card-section class="row items-center">
        <div>
          <div class="text-subtitle1 q-pl-sm">Modelo</div>
          <q-checkbox
            v-model="filters.models"
            val="Caminhão de carga"
            label="Caminhão de carga"
          />
          <q-checkbox
            v-model="filters.models"
            val="Harvester"
            label="Harvester"
          />
          <q-checkbox
            v-model="filters.models"
            val="Garra traçadora"
            label="Garra traçadora"
          />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="indigo-10" v-close-popup />
        <q-btn
          flat
          label="Filtrar"
          color="indigo-10"
          @click="getSpecificGeolocation"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";
import utils from "../boot/utils";
import { storeToRefs } from "pinia";
import { useEquipamentoStore } from "../stores/equipamento.store";

const { equipamentos, equipamentoDetalhes } = storeToRefs(
  useEquipamentoStore()
);
const { getEquipamentos, getEquipamentoDetalhes } = useEquipamentoStore();

const latitude = ref("");
const longitude = ref("");
const url = ref("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
const zoom = ref(11);
const center = ref([]);
const markerLatLng = ref([]);
const fabMap = ref(false);
const filters = ref({
  states: [],
  models: [],
});
const equipmentsLatLng = ref([]);
const ready = ref(false);
const equipDialog = ref(false);
const filterDialog = ref(false);
const tabEquip = ref("informacoes");
const estadoEquipamentoSelecionado = ref("");
const horasProdutivasSelecionado = ref("");
const ultimaAtualizacaoEquipamentoSelecionado = ref("");

onMounted(() => {
  getEquipamentos();
  getSpecificGeolocation();
});

const centerUpdated = (ct) => {
  if (center.value.lat !== ct.lat && center.value.lng !== ct.lng) {
    center.value = ct;
  }
};

const zoomUpdated = (zm) => {
  if (zoom.value !== zm) {
    zoom.value = zm;
  }
};

const setStateIcon = (equip) => {
  let choosedNameIcon = "excavator";

  console.log(equip);

  if (equip.model === "Caminhão de carga") {
    if (equip.state === "Operando") {
      choosedNameIcon = "truck_green";
    } else if (equip.state === "Parado") {
      choosedNameIcon = "truck_yellow";
    } else if (equip.state === "Manutenção") {
      choosedNameIcon = "truck_red";
    }
  } else if (equip.model === "Harvester") {
    if (equip.state === "Operando") {
      choosedNameIcon = "harvester_green";
    } else if (equip.state === "Parado") {
      choosedNameIcon = "harvester_yellow";
    } else if (equip.state === "Manutenção") {
      choosedNameIcon = "harvester_red";
    }
  } else if (equip.model === "Garra traçadora") {
    if (equip.state === "Operando") {
      choosedNameIcon = "excavator_green";
    } else if (equip.state === "Parado") {
      choosedNameIcon = "excavator_yellow";
    } else if (equip.state === "Manutenção") {
      choosedNameIcon = "excavator_red";
    }
  }

  const choosedIcon = L.icon({
    iconUrl: `/img/${choosedNameIcon}.png`,
    iconSize: [50, 50],
    iconAnchor: [16, 37],
  });

  return choosedIcon;
};

const setStateIconModal = (equip) => {
  let choosedIcon = "text-gray";

  console.log(equip);

  if (equip === "Operando") {
    choosedIcon = "text-green-aiko";
  } else if (equip === "Parado") {
    choosedIcon = "text-yellow-aiko";
  } else if (equip === "Manutenção") {
    choosedIcon = "text-red-aiko";
  }

  return choosedIcon;
};

const setEquipPositions = () => {
  const positions = equipamentos.value.map((arr) => {
    const lastPosition =
      arr.posicoesEquipamento[arr.posicoesEquipamento.length - 1];

    const horasProdutivas = getHorasProdutivas(arr.historicoEquipamento);
    return {
      date: lastPosition.date,
      lat: lastPosition.lat,
      log: lastPosition.lon,
      info: arr.nomeEquipamento,
      id: arr.idEquipamento,
      state: arr.historicoEquipamento[0].stateName,
      model: arr.modeloEquipamento.name,
      horas_produtivas: horasProdutivas,
    };
  });

  console.log(filters.value);

  let filterPosition = positions;

  if (filters.value.states.length > 0) {
    filterPosition = filterPosition.filter((v) =>
      filters.value.states.includes(v.state)
    );
  }

  if (filters.value.models.length > 0) {
    filterPosition = filterPosition.filter((v) =>
      filters.value.models.includes(v.model)
    );
  }

  equipmentsLatLng.value = filterPosition;
};

const getHorasProdutivas = (historico) => {
  // Data específica para comparação
  const dataEspecifica = utils.newDataGMT(
    historico[0].date,
    "DD/MM/YYYY HH:MM:SS"
  );

  // Intervalo de 24 horas atrás da data específica
  const inicioIntervalo = new Date(
    dataEspecifica.getTime() - 24 * 60 * 60 * 1000
  );
  const fimIntervalo = dataEspecifica;

  const dadosFiltrados = historico.filter((obj) => {
    return (
      utils.newDataGMT(obj.date, "DD/MM/YYYY HH:MM:SS") >= inicioIntervalo &&
      utils.newDataGMT(obj.date, "DD/MM/YYYY HH:MM:SS") <= fimIntervalo
    );
  });

  console.log(dadosFiltrados);
  let horasProdutivas = 0;

  dadosFiltrados.forEach((dado, index) => {
    let dataInicial;
    let dataFinal;
    let diferencaMilissegundos;
    let horas;
    if (dado.stateName === "Operando" && index > 0) {
      if (index < dadosFiltrados.length - 1) {
        dataInicial = utils.newDataGMT(
          dadosFiltrados[index + 1].date,
          "DD/MM/YYYY HH:MM:SS"
        );
        dataFinal = utils.newDataGMT(dado.date, "DD/MM/YYYY HH:MM:SS");
      } else if (index === dadosFiltrados.length - 1) {
        dataInicial = utils.newDataGMT(dado.date, "DD/MM/YYYY HH:MM:SS");
        dataFinal = utils.newDataGMT(
          dadosFiltrados[index - 1].date,
          "DD/MM/YYYY HH:MM:SS"
        );
      }
      diferencaMilissegundos = dataFinal - dataInicial;

      horas = diferencaMilissegundos / (1000 * 60 * 60);

      horasProdutivas += horas;
    }
  });

  return horasProdutivas;
};

const getEquipDetails = (equip) => {
  estadoEquipamentoSelecionado.value = equip.state;
  ultimaAtualizacaoEquipamentoSelecionado.value = utils.formatarDataGMT(
    equip.date,
    "DD/MM/YYYY HH:MM:SS"
  );
  horasProdutivasSelecionado.value = calculoProdutividadeEquipamento(
    equip.horas_produtivas
  );
  getEquipamentoDetalhes(equip.id);
  equipDialog.value = true;
  tabEquip.value = "informacoes";
};

const calculoProdutividadeEquipamento = (horas) => {
  return utils.toPercentDecimal(horas / 24);
};

const getSpecificGeolocation = async () => {
  utils.showLoadingWithMessage("Centralizando mapa...");
  setEquipPositions();
  if (equipmentsLatLng.value.length > 0) {
    latitude.value = parseFloat(equipmentsLatLng.value[0].lat);
    longitude.value = parseFloat(equipmentsLatLng.value[0].log);
    const position = {
      latitude: parseFloat(equipmentsLatLng.value[0].lat),
      longitude: parseFloat(equipmentsLatLng.value[0].log),
    };
    setPosition(position);
  } else {
    errorPosition();
  }
};

const getLoc = () => {
  zoom.value = 11;
  utils.showLoadingWithMessage("Centralizando mapa...");
  setTimeout(() => {
    center.value = new L.LatLng(latitude.value, longitude.value + 0.001);
    utils.hideLoading();
  }, 2000);
};

const setPosition = () => {
  center.value = new L.LatLng(latitude.value, longitude.value + 0.001);
  utils.hideLoading();
  utils.mensagemSucesso("Posição recuperada com sucesso!");
  ready.value = true;
};

const errorPosition = () => {
  utils.mensagemErro("Não foi possível recupera sua posição!");
};
</script>

<style>
.mapa-layout {
  height: calc(100vh - 50px);
  width: calc(100vw - 57px);
}
.text-green-aiko {
  color: #2ecc71 !important;
}

.text-yellow-aiko {
  color: #f1c40f !important;
}

.text-red-aiko {
  color: #e74c3c !important;
}
</style>
